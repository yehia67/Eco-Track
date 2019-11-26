package com.example.nfc_reclying_products;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.nfc.tech.MifareClassic;
import android.nfc.tech.MifareUltralight;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.nfc.tech.NfcA;
import android.nfc.tech.NfcB;
import android.nfc.tech.NfcF;
import android.nfc.tech.NfcV;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Locale;

import cz.msebera.android.httpclient.entity.mime.Header;

import static android.content.ContentValues.TAG;
import static android.widget.Toast.LENGTH_LONG;

public class MainActivity extends AppCompatActivity {
    private TextView mTextView; //ECP 2017-01-16
    Button setAddress;
    EditText address;
    TextView currentAddress;
   SaveReceivingAddress manageAddress = new SaveReceivingAddress();
    // list of NFC technologies detected:
    private final String[][] techList = new String[][] {
            new String[] {
                    NfcA.class.getName(),
                    NfcB.class.getName(),
                    NfcF.class.getName(),
                    NfcV.class.getName(),
                    IsoDep.class.getName(),
                    MifareClassic.class.getName(),
                    MifareUltralight.class.getName(), Ndef.class.getName()
            }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        address = (EditText) findViewById(R.id.address);
        setAddress = (Button) findViewById(R.id.setAddress);
        mTextView = (TextView) findViewById(R.id.textView_explanation);
        mTextView.setText("item data will appear here when you start scanning");
        getCurrentAddress();
        /*-----------------------------------------------------------------------------------------------------*/
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, "http://192.168.43.174:3002/test",
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
    public void getCurrentAddress(){
        currentAddress = (TextView) findViewById(R.id.defaultReceivingAddress);
        SharedPreferences prefs = getSharedPreferences("Local Address", MODE_PRIVATE);
        String getAddress = prefs.getString("address", "404 address");
        if (!getAddress.equals("404 address")){
            currentAddress.setText("Your current address is "+ getAddress);
        }

    }
    public  void  storeAddress(View view){
      if(manageAddress.checkAddress(address.getText().toString())){
          try {
              manageAddress.storeAddress(address.getText().toString(),getApplicationContext());
          }
          catch (Exception e){
              Toast.makeText(getApplicationContext(),e.getLocalizedMessage(), LENGTH_LONG).show();

          }
        }
        else {
            Toast.makeText(getApplicationContext(),"Invalid Address ", LENGTH_LONG).show();
        }
    }
 

    @Override
    protected void onResume() {
        super.onResume();
        Log.d("onResume", "1");

        //mTextView.setText("onResume:");
        // creating pending intent:
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);
        // creating intent receiver for NFC events:
        IntentFilter filter = new IntentFilter();
        filter.addAction(NfcAdapter.ACTION_TAG_DISCOVERED);
        filter.addAction(NfcAdapter.ACTION_NDEF_DISCOVERED);
        filter.addAction(NfcAdapter.ACTION_TECH_DISCOVERED);
        // enabling foreground dispatch for getting intent from NFC event:
        NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        nfcAdapter.enableForegroundDispatch(this, pendingIntent, new IntentFilter[]{filter}, this.techList);
    }

    @Override
    protected void onPause() {
        super.onPause();

        Log.d("onPause", "1");

        // disabling foreground dispatch:
        NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        Log.d("onNewIntent", "1");

        if (intent.getAction().equals(NfcAdapter.ACTION_TAG_DISCOVERED)) {
            Log.d("onNewIntent", "2");

            //if(getIntent().hasExtra(NfcAdapter.EXTRA_TAG)){


            Parcelable[] messages1 = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
            if (messages1 != null) {
                Log.d(TAG, "Found " + messages1.length + " NDEF messages");
            }
            else {
                Log.d(TAG, "Not EXTRA_NDEF_MESSAGES");
            }

            Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            Ndef ndef = Ndef.get(tag);
            if(ndef != null) {

                Log.d("onNewIntent:", "NfcAdapter.EXTRA_TAG");

                Parcelable[] messages = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
                if (messages != null && messages.length > 0 ) {

                    readTextFromMessage((NdefMessage) messages[0]);
                }
            }
            else {
                mTextView.setText("No NFC found");
            }


            //mTextView.setText( "NFC Tag\n" + ByteArrayToHexString(intent.getByteArrayExtra(NfcAdapter.EXTRA_TAG)));
        }
    }

    private void readTextFromMessage(NdefMessage ndefMessage) {

        NdefRecord[] ndefRecords = ndefMessage.getRecords();

        if(ndefRecords != null && ndefRecords.length>0){

            NdefRecord ndefRecord = ndefRecords[0];

            String tagContent = getTextFromNdefRecord(ndefRecord);
            if(manageAddress.checkAddress(tagContent)){
                mTextView.setText(tagContent);
                setOwner(tagContent);
            }
            else {
                mTextView.setText("Invalid Address :" +tagContent);

            }

        }else
        {
            Toast.makeText(this, "No NDEF records found!", Toast.LENGTH_SHORT).show();
        }

    }
    private void setOwner(String _productAddress){
        /*-----------------------------------------------------------------------------------------------------*/
        SharedPreferences prefs = getSharedPreferences("Local Address", MODE_PRIVATE);
        String getAddress = prefs.getString("address", "404 address");
        Toast.makeText(getApplicationContext(), getAddress +"********"+_productAddress, LENGTH_LONG);

        if(!getAddress.equals("404 address"))
        {
            try {
                RequestQueue requestQueue = Volley.newRequestQueue(this);
                String URL = "http://192.168.43.174:3002/setProductOwner";
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("id", getAddress);
                jsonBody.put("rootAddress", _productAddress);
                final String requestBody = jsonBody.toString();

                StringRequest stringRequest = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(), response, LENGTH_LONG);


                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), String.valueOf((error)), LENGTH_LONG);

                    }
                });

                requestQueue.add(stringRequest);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        else{
            Toast.makeText(getApplicationContext(), "Please save your current address to own any product", LENGTH_LONG);
        }
        /*-----------------------------------------------------------------------------------------------------*/
    }

    public String getTextFromNdefRecord(NdefRecord ndefRecord) {
        String tagContent = null;
        try {
            byte[] payload = ndefRecord.getPayload();
            String textEncoding = ((payload[0] & 128) == 0) ? "UTF-8" : "UTF-16";
            int languageSize = payload[0] & 0063;
            tagContent = new String(payload, languageSize + 1,
                    payload.length - languageSize - 1, textEncoding);
        } catch (UnsupportedEncodingException e) {
            Log.e("getTextFromNdefRecord", e.getMessage(), e);
        }
        return tagContent;
    }



}
