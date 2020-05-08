package com.example.nfc_reclying_products;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.widget.Toast.LENGTH_LONG;
import static android.widget.Toast.LENGTH_SHORT;

public class StartMenue extends AppCompatActivity {
    Button client_app_button ,trash_app_button;
    static final int request_code = 2;
    Constants base_url = new Constants();
    Intent client_app ,trash_app_intent_go;
    ApiPlaceHolder apiPlaceHolder ;
    ProductAddress productAddress = new ProductAddress();
    Retrofit retrofit = new Retrofit();
    public void onActivityResult(int _requestCode, int _resultCode, Intent _data) {
        super.onActivityResult(_requestCode, _resultCode, _data);
        if (_requestCode == 2) {
            try {
                String scanned_item = _data.getStringExtra(ScanNfcTag.key);
                StringBuilder sb = new StringBuilder();
                sb.append("product to be recycled address is ");
                sb.append(scanned_item);
                giveReward(scanned_item);
                Toast.makeText(getApplicationContext(), sb.toString(), Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), "You scanned nothing", Toast.LENGTH_SHORT).show();
            }
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_menue);
        client_app = new Intent(getApplicationContext() ,MainActivity.class);
        trash_app_intent_go = new Intent(getApplicationContext(),ScanForReward.class);
        client_app_button =(Button)findViewById(R.id.clientAppButton);
        trash_app_button = (Button)findViewById(R.id.trashAppButton);
        apiPlaceHolder = retrofit.retrofit.create(ApiPlaceHolder.class);

        client_app_button.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                //-------------------------------------------------------------------------------------------------------
                RequestQueue request_queue = Volley.newRequestQueue(getApplicationContext());
                StringRequest test_request = new StringRequest(Request.Method.GET,base_url.BASE_URL+"test",new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(),response.toString(), LENGTH_LONG).show();
                    }
                }, new Response.ErrorListener(){
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(),error.toString(), LENGTH_LONG).show();
                    }
                });
                request_queue.add(test_request);

                //-------------------------------------------------------------------------------------------------------

                startActivity(client_app);
            }
        });
        trash_app_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivityForResult(trash_app_intent_go ,request_code);
            }
        });

    }

    public void  ToastMessage(String msg){
        Toast.makeText(this,msg, LENGTH_LONG).show();
    }

    //-----------------------------------------------------------------------------------------------------------
    public void giveReward(String _product_address){
        this.productAddress.setProductAddress(_product_address);
        Toast.makeText(this,"i am the address : "+ productAddress, LENGTH_SHORT).show();
            Call<String> call = apiPlaceHolder.giveReward(productAddress);
            call.enqueue(new Callback<String>() {
                @Override
                public void onResponse(Call<String> call, retrofit2.Response<String> response) {

                    if(!response.isSuccessful()){
                        Log.i("ziwwwwww","something went wrong");
                        return;
                    }
                    else {

                        ToastMessage("1 i. has been sent  congrats  check your balance !!");
                       // balanceTv.setText("Your balance is      " + balnce_str + "  iotas");


                    }
                }

                @Override
                public void onFailure(Call<String> call, Throwable t) {
                    Log.i("ziwwwwww","failure");
                }
            });


    }






    //-----------------------------------------------------------------------------------------------------------
}
