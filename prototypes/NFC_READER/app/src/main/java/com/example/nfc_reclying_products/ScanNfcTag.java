package com.example.nfc_reclying_products;

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
import android.nfc.tech.NfcA;
import android.nfc.tech.NfcB;
import android.nfc.tech.NfcF;
import android.nfc.tech.NfcV;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.ErrorListener;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import java.io.UnsupportedEncodingException;
import org.json.JSONException;
import org.json.JSONObject;

import static android.widget.Toast.LENGTH_LONG;

public class ScanNfcTag extends AppCompatActivity {
    public static final String key = "Key";
    Intent mainActivityIntentGo ;
    SaveReceivingAddress manageAddress = new SaveReceivingAddress();
    Intent scanNfcTagIntent2;
    //MainActivity setingOwner = new MainActivity();
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


    /* access modifiers changed from: protected */
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView((int) R.layout.activity_scan_nfc_tag);
        scanNfcTagIntent2 = getIntent();
        mainActivityIntentGo = new Intent(this, MainActivity.class);


    }

    /* access modifiers changed from: protected */
    public void onResume() {
        super.onResume();
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

    /* access modifiers changed from: protected */
    public void onPause() {
        super.onPause();
        Log.d("onPause", "1");
        NfcAdapter.getDefaultAdapter(this).disableForegroundDispatch(this);
    }

    /* access modifiers changed from: protected */
    public void onNewIntent(Intent intent) {
        String str = "onNewIntent";
        Log.d(str, "1");
        if (intent.getAction().equals("android.nfc.action.TAG_DISCOVERED")) {
            Log.d(str, "2");
            String str2 = "android.nfc.extra.NDEF_MESSAGES";
            Parcelable[] messages1 = intent.getParcelableArrayExtra(str2);
            String str3 = "ContentValues";
            if (messages1 != null) {
                StringBuilder sb = new StringBuilder();
                sb.append("Found ");
                sb.append(messages1.length);
                sb.append(" NDEF messages");
                Log.d(str3, sb.toString());
            } else {
                Log.d(str3, "Not EXTRA_NDEF_MESSAGES");
            }
            if (Ndef.get((Tag) intent.getParcelableExtra("android.nfc.extra.TAG")) != null) {
                Log.d("onNewIntent:", "NfcAdapter.EXTRA_TAG");
                Parcelable[] messages = intent.getParcelableArrayExtra(str2);
                if (messages != null && messages.length > 0) {
                    readTextFromMessage((NdefMessage) messages[0]);
                    return;
                }
                return;
            }
            this.scanNfcTagIntent2.putExtra(key, "No NFC found");
            setResult(-1, this.scanNfcTagIntent2);
            finish();
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
                String URL = "http://192.168.1.4:5002/setProductOwner";
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

    private void readTextFromMessage(NdefMessage ndefMessage) {
        NdefRecord[] ndefRecords = ndefMessage.getRecords();
        if (ndefRecords == null || ndefRecords.length <= 0) {
            Toast.makeText(this, "No NDEF records found!", Toast.LENGTH_SHORT).show();
            startActivity(this.mainActivityIntentGo);
            return;
        }
        String tagContent = getTextFromNdefRecord(ndefRecords[0]);
        boolean checkAddress = this.manageAddress.checkAddress(tagContent);
        String str = key;
        if (checkAddress) {
            this.scanNfcTagIntent2.putExtra(str, tagContent);
            setResult(-1, this.scanNfcTagIntent2);
            finish();
            setOwner(tagContent);
            return;
        }
        Intent intent = this.scanNfcTagIntent2;
        StringBuilder sb = new StringBuilder();
        sb.append("Invalid Address :");
        sb.append(tagContent);
        intent.putExtra(str, sb.toString());
        setResult(-1, this.scanNfcTagIntent2);
        finish();
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
