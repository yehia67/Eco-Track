package com.example.nfc_reclying_products;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.nfc.tech.IsoDep;
import android.nfc.tech.MifareClassic;
import android.nfc.tech.MifareUltralight;
import android.nfc.tech.Ndef;
import android.nfc.tech.NfcA;
import android.nfc.tech.NfcB;
import android.nfc.tech.NfcF;
import android.nfc.tech.NfcV;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.ErrorListener;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import static android.widget.Toast.LENGTH_LONG;

public class MainActivity extends AppCompatActivity {
    static final int requestCode = 1;
    EditText address;
    Button changeAddress;
    TextView currentAddress;
    Button historyButton;
    private TextView mTextView;
    SaveReceivingAddress manageAddress = new SaveReceivingAddress();
    Button myItemsButton;
    Button scanNfcTagButton;
    Button setAddress;
    public static final String root = "FLPYQZOAFZ9COLVBO9LJNZJYIWJJKDDQGZMHYJSLLNTANN9QWFUCQRLUVDQVBNTZUPKNAJAJKAODQVIYN";
    //private final String[][] techList = {new String[]{NfcA.class.getName(), NfcB.class.getName(), NfcF.class.getName(), NfcV.class.getName(), IsoDep.class.getName(), MifareClassic.class.getName(), MifareUltralight.class.getName(), Ndef.class.getName()}};
//-----------------------------------------------------------------------------------------------------------------------
   public void ApiInit(){
       try{

           RequestQueue requestQueue = Volley.newRequestQueue(this);
           String URL = "http://192.168.1.4:5002/init";
           StringRequest stringRequest = new StringRequest(Request.Method.GET, URL,
                   new Response.Listener<String>() {
                       @Override
                       public void onResponse(String response) {
                           Toast.makeText(getApplicationContext(),"Api Init response : "+response, LENGTH_LONG).show();
                       }
                   }, new Response.ErrorListener() {
               @Override
               public void onErrorResponse(VolleyError error) {
                   Toast.makeText(getApplicationContext(),error.getLocalizedMessage(), LENGTH_LONG).show();
               }
           });

           requestQueue.add(stringRequest);


       }catch (Exception e){
           e.printStackTrace();
           Toast.makeText(this,"catch error",Toast.LENGTH_SHORT).show();
       }
   }
   //---------------------------------------------------------------------------------




    /* access modifiers changed from: protected */
    public void onActivityResult(int requestCode2, int resultCode, Intent data) {
        super.onActivityResult(requestCode2, resultCode, data);
        if (requestCode2 == 1) {
            try {
                String scannedItem = data.getStringExtra(ScanNfcTag.key);
                this.mTextView.setText(scannedItem);
                Context applicationContext = getApplicationContext();
                StringBuilder sb = new StringBuilder();
                sb.append("message is ");
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
        address = (EditText) findViewById(R.id.address);
        setAddress = (Button) findViewById(R.id.setAddress);
        changeAddress = (Button) findViewById(R.id.changeAdress);
        changeAddress.setVisibility(View.INVISIBLE);
        mTextView = (TextView) findViewById(R.id.textView_explanation);
        mTextView.setText("item data will appear here when you start scanning");
        scanNfcTagButton = (Button) findViewById(R.id.scanNfcTagButton);
        historyButton = (Button) findViewById(R.id.historyButton);
        myItemsButton = (Button) findViewById(R.id.myItemsButton);
        getCurrentAddress();
        ApiInit();
        //Intent intent = getIntent();
        final Intent scanNfcTagIntentGo = new Intent(this, ScanNfcTag.class);
        Context applicationContext = getApplicationContext();

        changeAddress.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                MainActivity.this.address.setEnabled(true);
                MainActivity.this.setAddress.setVisibility(View.VISIBLE);
                MainActivity.this.changeAddress.setVisibility(View.INVISIBLE);
            }
        });
        this.scanNfcTagButton.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                startActivityForResult(scanNfcTagIntentGo, requestCode);
            }
        });
        /*-----------------------------------------------------------------------------------------------------*/
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, "http://192.168.1.4:5002/test",
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(),response, LENGTH_LONG).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(),error.getLocalizedMessage(), LENGTH_LONG).show();
            }
        });
        // Add the request to the RequestQueue.
        queue.add(stringRequest);
        /*-----------------------------------------------------------------------------------------------------*/
    }

    public void getCurrentAddress() {
        currentAddress = (TextView) findViewById(R.id.defaultReceivingAddress);
        String str = "404 address";
        SharedPreferences prefs = getSharedPreferences("Local Address", MODE_PRIVATE);
        String getAddress = prefs.getString("address", "404 address");
        //String getAddress = getSharedPreferences("Local Address", 0).getString("address", str);
        if (!getAddress.equals(str)) {
            changeAddress.setVisibility(View.VISIBLE);
            changeAddress.setText("Change Address");
            address.setEnabled(false);
            setAddress.setVisibility(View.INVISIBLE);
            scanNfcTagButton.setVisibility(View.VISIBLE);
            historyButton.setVisibility(View.VISIBLE);
            myItemsButton.setVisibility(View.VISIBLE);
            TextView textView = this.currentAddress;
            StringBuilder sb = new StringBuilder();
            sb.append("Your current address is ");
            sb.append(getAddress);
            textView.setText(sb.toString());
            return;
        }
        this.setAddress.setText("Set Adress");
        this.scanNfcTagButton.setVisibility(View.INVISIBLE);
        this.historyButton.setVisibility(View.INVISIBLE);
        this.myItemsButton.setVisibility(View.INVISIBLE);
    }

    public void storeAddress(View view) {
        if (manageAddress.checkAddress(address.getText().toString())) {
            try {
                manageAddress.storeAddress(this.address.getText().toString(), getApplicationContext());
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(getApplicationContext(), "Invalid Address ", Toast.LENGTH_SHORT).show();
        }
        getCurrentAddress();
    }
}
