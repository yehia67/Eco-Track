package com.example.nfc_reclying_products;

import android.content.Context;
import android.content.Intent;
import android.nfc.tech.IsoDep;
import android.nfc.tech.MifareClassic;
import android.nfc.tech.MifareUltralight;
import android.nfc.tech.Ndef;
import android.nfc.tech.NfcA;
import android.nfc.tech.NfcB;
import android.nfc.tech.NfcF;
import android.nfc.tech.NfcV;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.ErrorListener;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import io.paperdb.Paper;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.widget.Toast.LENGTH_LONG;
import static android.widget.Toast.LENGTH_SHORT;

public class MainActivity extends AppCompatActivity implements WalletAddress.UpdateDialogListener{
    Constants base_url = new Constants();
    static final int request_code = 1;
    Button change_address ,scan_nfc_tag_button ,my_items_button ,history_button ;
    TextView addressTv ,balanceTv ,product_address_tv ;
    SaveReceivingAddress manage_address = new SaveReceivingAddress();
    public  String root;
    public boolean flag = false ;
    Retrofit retrofit = new Retrofit();
    ApiPlaceHolder apiPlaceHolder ;
    AddOwner addOwner = new AddOwner();


    @Override
    public void applyText(String update_message) {
        String wallet_address = update_message ;
        storeAddress(update_message);
    }

    public void openUpdateDialog(){
        WalletAddress wallet_address_dialog = new WalletAddress();
        if(!flag){
            wallet_address_dialog.setCancelable(false);
        }
        wallet_address_dialog.show(getSupportFragmentManager(),"Wallet Address");

    }


    /* access modifiers changed from: protected */
    public void onActivityResult(int _requestCode, int _resultCode, Intent _data) {
        super.onActivityResult(_requestCode, _resultCode, _data);
        if (_requestCode == 1) {
            try {
                String scannedItem = _data.getStringExtra(ScanNfcTag.key);
                AddOwnerCall(scannedItem);
                this.product_address_tv.setText(scannedItem);
                product_address_tv.setVisibility(View.VISIBLE);
                Context applicationContext = getApplicationContext();
                StringBuilder sb = new StringBuilder();
                sb.append("product address is ");
                sb.append(scannedItem);
                Toast.makeText(applicationContext, sb.toString(), Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), "You scanned nothing", Toast.LENGTH_SHORT).show();
            }
        }
    }

    /* access modifiers changed from: protected */
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView((int) R.layout.activity_main);
        Paper.init(this);
        change_address = (Button) findViewById(R.id.changeAdress);
        scan_nfc_tag_button = (Button) findViewById(R.id.scanNfcTagButton);
        history_button = (Button) findViewById(R.id.historyButton);
        my_items_button = (Button) findViewById(R.id.myItemsButton);
        addressTv = findViewById(R.id.addressTv);
        balanceTv = findViewById(R.id.balanceTv);
        product_address_tv = findViewById(R.id.produdct_address);
        apiPlaceHolder = retrofit.retrofit.create(ApiPlaceHolder.class);
        hasAddress();
        Intent main_activity_get_intent1 = getIntent();
        final Intent scan_nfc_tag_intent_go = new Intent(this, ScanNfcTag.class);
        change_address.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                openUpdateDialog();
            }
        });
        this.scan_nfc_tag_button.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                startActivityForResult(scan_nfc_tag_intent_go, request_code);
            }
        });


    }

    public void hasAddress() {
        String str = "No address found";
        String get_address = Paper.book("My_Address").read("address",str);
        if (!get_address.equals(str)) {
            addressTv.setText("Your wallet\'s address :     " +get_address );
            balanceTv.setText("Your balance is :     1 iotas ");
            checkBalance();
            flag = true ;
            return;
        }
        else {
            openUpdateDialog();
        }
    }

    public void storeAddress(String str) {
        if (manage_address.checkAddress(str)) {
            try {
                manage_address.storeAddress(str, getApplicationContext());
                addressTv.setText(str);
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(getApplicationContext(), "Invalid Address ", Toast.LENGTH_SHORT).show();
        }
        hasAddress();
    }

    public void  ToastMessage(String msg){
        Toast.makeText(this,msg, LENGTH_LONG).show();
    }
    //------------------------------------------------------------------------------------------------------------
    public void AddOwnerCall(String _product_address){
        String str = "No address found";
        String get_address = Paper.book("My_Address").read("address",str);
        if (!get_address.equals(str)) {
            this.addOwner.setProductAddress(_product_address);
            this.addOwner.setOwnerAddress(get_address);
            Call<String> call = apiPlaceHolder.addOwner(this.addOwner);
            call.enqueue(new Callback<String>() {
                @Override
                public void onResponse(Call<String> call, retrofit2.Response<String> response) {

                    if(!response.isSuccessful()){
                        Log.i("ziwwwwww","something went wrong");
                        return;
                    }
                    else {

                        ToastMessage("Now you are the owner of this product");
                    }
                }

                @Override
                public void onFailure(Call<String> call, Throwable t) {
                    Log.i("ziwwwwww","failure");
                }
            });
        }

    }


    //-----------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------
    public void checkBalance(){
        String owner_adderss = Paper.book("My_Address").read("address","404 address");
        if(!(owner_adderss == "404 address")){
            Call<Integer> call = apiPlaceHolder.getBalance(owner_adderss);
            call.enqueue(new Callback<Integer>() {
                @Override
                public void onResponse(Call<Integer> call, retrofit2.Response<Integer> response) {

                    if(!response.isSuccessful()){
                        Log.i("ziwwwwww","something went wrong");
                        return;
                    }
                    else {
                        Integer balance  = response.body();
                        String balnce_str = Integer.toString(balance);
                        balanceTv.setText("Your balance is      " + balnce_str + "  iotas");
                        Log.i("ressssssssssss",balnce_str);

                    }
                }

                @Override
                public void onFailure(Call<Integer> call, Throwable t) {

                }
            });
        }

    }


    //------------------------------------------------------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------------------------------------------------------------



    //--------------------------------------------------------------------------------------------------------------------------------------




}

