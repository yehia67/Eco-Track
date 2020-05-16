package com.example.product_reader;

import androidx.appcompat.app.AppCompatActivity;

import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
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
import android.widget.TextView;
import android.widget.Toast;

import java.io.UnsupportedEncodingException;

import static java.lang.Character.isLowerCase;

public class ScanProduct extends AppCompatActivity {
    private final String[][] teck_list = new String[][]{
            new String[]{
                    NfcA.class.getName(),
                    NfcB.class.getName(),
                    NfcF.class.getName(),
                    NfcV.class.getName(),
                    IsoDep.class.getName(),
                    MifareClassic.class.getName(),
                    MifareUltralight.class.getName(), Ndef.class.getName()
            }
    };

    public static final String key = "key";
    Intent kind_of_request_intent ;
    Intent main_activity_intent ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan);
        kind_of_request_intent = new Intent(this,KindOfRequest.class);
        main_activity_intent = new Intent(this,MainActivity.class);

    }

    public void onResume() {
        super.onResume();
        PendingIntent pending_intent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);
        // creating intent receiver for NFC events:
        IntentFilter filter = new IntentFilter();
        filter.addAction(NfcAdapter.ACTION_TAG_DISCOVERED);
        filter.addAction(NfcAdapter.ACTION_NDEF_DISCOVERED);
        filter.addAction(NfcAdapter.ACTION_TECH_DISCOVERED);
        // enabling foreground dispatch for getting intent from NFC event:
        NfcAdapter nfc_adapter = NfcAdapter.getDefaultAdapter(this);
        nfc_adapter.enableForegroundDispatch(this, pending_intent, new IntentFilter[]{filter}, this.teck_list);
    }

    public void onPause() {
        super.onPause();
        Log.d("onPause", "1");
        NfcAdapter.getDefaultAdapter(this).disableForegroundDispatch(this);
    }

    @Override
    protected void onNewIntent(Intent _intent) {
        super.onNewIntent(_intent);
        String str = "onNewIntent";
        Log.d(str, "1");
        if (_intent.getAction().equals("android.nfc.action.TAG_DISCOVERED")) {
            Log.d(str, "2");
            String str2 = "android.nfc.extra.NDEF_MESSAGES";
            Parcelable[] messages1 = _intent.getParcelableArrayExtra(str2);
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
            if (Ndef.get((Tag) _intent.getParcelableExtra("android.nfc.extra.TAG")) != null) {
                Log.d("onNewIntent:", "NfcAdapter.EXTRA_TAG");
                Parcelable[] messages = _intent.getParcelableArrayExtra(str2);
                if (messages != null && messages.length > 0) {
                    readTextFromMessage((NdefMessage) messages[0]);
                    return;
                }
                return;
            }
            //Toast.makeText(this,"heey",Toast.LENGTH_LONG).show();
            finish();
        }
    }

    private void readTextFromMessage(NdefMessage _ndefMessage) {
        NdefRecord[] ndef_records = _ndefMessage.getRecords();
        if (ndef_records == null || ndef_records.length <= 0) {
            Toast.makeText(this, "No NDEF records found!", Toast.LENGTH_SHORT).show();
            startActivity(this.main_activity_intent);
            return;
        }
        String tag_content = getTextFromNdefRecord(ndef_records[0]);
        boolean check_address = checkAddress(tag_content);
        String str = key;
        if (true) {
            //Toast.makeText(this,tag_content,Toast.LENGTH_LONG).show();
            this.kind_of_request_intent.putExtra(str, tag_content);
            //Toast.makeText(this,"hee1",Toast.LENGTH_LONG).show();
            startActivity(kind_of_request_intent);
            //Toast.makeText(this,"heey24",Toast.LENGTH_LONG).show();
            //finish();

            return;
        } else {
            StringBuilder sb = new StringBuilder();
            sb.append("Invalid Address :");
            sb.append(tag_content);
            Toast.makeText(this, "Invalid Address  !", Toast.LENGTH_SHORT).show();
            main_activity_intent.putExtra(str, sb.toString());
            startActivity(main_activity_intent);
            finish();
        }


    }

    public String getTextFromNdefRecord(NdefRecord _ndefRecord) {
        String tag_content = null;
        try {
            byte[] payload = _ndefRecord.getPayload();
            String text_encoding = ((payload[0] & 128) == 0) ? "UTF-8" : "UTF-16";
            int languageSize = payload[0] & 0063;
            tag_content = new String(payload, languageSize + 1,
                    payload.length - languageSize - 1, text_encoding);
        } catch (UnsupportedEncodingException e) {
            Log.e("getTextFromNdefRecord", e.getMessage(), e);
        }
        return tag_content;
    }

    public boolean checkAddress(String _address) {
        if ((_address.codePointCount(0,_address.length()) == 90 || _address.codePointCount(0,_address.length()) == 81)) {
            for (int i = 0; i < _address.length(); i++) {
                if (_address.indexOf(i) != '9' && isLowerCase(_address.indexOf(i))) {
                    return false;
                }
            }
            return true;
        }

        else{
            return false;
        }
    }
}
