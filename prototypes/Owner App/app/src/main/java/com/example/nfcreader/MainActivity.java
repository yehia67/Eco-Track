package com.example.nfcreader;

import androidx.appcompat.app.AppCompatActivity;

import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    Spinner spinner ;
    String[] choices = { "Write", "Read" };
    NfcAdapter nfcAdapter ;
    EditText addressEditText ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        spinner = (Spinner)findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, choices);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        addressEditText = (EditText) findViewById(R.id.addressEditText);

    }

    @Override
    protected void onResume() {
        super.onResume();
        EnableForegroundDispatchSystem();
    }
    @Override
    protected void onPause() {
        super.onPause();
        DisableForegroundDispatchSystem();
    }

    private void EnableForegroundDispatchSystem(){
        Intent intent = new Intent(this ,MainActivity.class).addFlags(Intent.FLAG_RECEIVER_REPLACE_PENDING);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,intent,0);
        IntentFilter[] intentFilters =new IntentFilter[]{};
        nfcAdapter.enableForegroundDispatch(this ,pendingIntent,intentFilters,null);
    }

    private void DisableForegroundDispatchSystem(){
        nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        if(intent.hasExtra(NfcAdapter.EXTRA_TAG)){
            Toast.makeText(this,"NfcIntent!!",Toast.LENGTH_SHORT).show();
            if(spinner.getSelectedItem().toString() == "Write"){
                Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
                NdefMessage ndefMessage = createNdefMessage(addressEditText.getText().toString());
                WriteNdefMessage(tag ,ndefMessage);
                //"MYIOTAADDRESSIS999999999999999999999999999999999999999999999999999999999999999999"
            }
            else{
                Parcelable[] parcelables = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);

                if(parcelables != null && parcelables.length > 0)
                {
                    readTextFromMessage((NdefMessage) parcelables[0]);
                }else{
                    Toast.makeText(this, "No NDEF messages found!", Toast.LENGTH_SHORT).show();
                }
            }

        }
    }

    private void readTextFromMessage(NdefMessage ndefMessage) {

        NdefRecord[] ndefRecords = ndefMessage.getRecords();

        if(ndefRecords != null && ndefRecords.length>0){

            NdefRecord ndefRecord = ndefRecords[0];

            String tagContent = getTextFromNdefRecord(ndefRecord);

            addressEditText.setText(tagContent);

        }else
        {
            Toast.makeText(this, "No NDEF records found!", Toast.LENGTH_SHORT).show();
        }

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

    private NdefMessage createNdefMessage(String content) {

        NdefRecord ndefRecord = createTextRecord(content);

        NdefMessage ndefMessage = new NdefMessage(new NdefRecord[]{ndefRecord});
        Toast.makeText(this,"ndefMessage created successfuly",Toast.LENGTH_SHORT).show();

        return ndefMessage;
    }

    private void WriteNdefMessage(Tag tag ,NdefMessage ndefMessage){
        try {
            if(tag == null){
                Toast.makeText(this,"Tag object can not be null  !!! ",Toast.LENGTH_SHORT).show();
                return;
            }
            //Toast.makeText(this,"st 3 ! ",Toast.LENGTH_SHORT).show();
            Ndef ndef = Ndef.get(tag);
            //Toast.makeText(this,"st 4 ! ",Toast.LENGTH_SHORT).show();

            if(ndef == null){
                //  Toast.makeText(this,"st 5 ! ",Toast.LENGTH_SHORT).show();
                FormatTag(tag ,ndefMessage);
                //Toast.makeText(this,"i stucked here  !!! ",Toast.LENGTH_SHORT).show();


            }
            else {
                //Toast.makeText(this,"st 6 ! ",Toast.LENGTH_SHORT).show();
                ndef.connect();
                if(!ndef.isWritable()){
                    Toast.makeText(this,"Tag is not  writable !!! ",Toast.LENGTH_SHORT).show();
                    ndef.close();
                    return;
                }
                //Toast.makeText(this,"st 1 ! ",Toast.LENGTH_SHORT).show();

                ndef.writeNdefMessage(ndefMessage);
                //Toast.makeText(this,"st 2 ! ",Toast.LENGTH_SHORT).show();
                ndef.close();

                Toast.makeText(this,"Tag  written !!! ",Toast.LENGTH_SHORT).show();
            }


        }catch (Exception e){
            Log.e(" WriteNdefMessage ",e.getMessage());
        }
    }

    private void  FormatTag(Tag tag ,NdefMessage ndefMessage){

        try{
            NdefFormatable ndefFormatable = NdefFormatable.get(tag);
            //Toast.makeText(this,"ndef formatable is fine  ",Toast.LENGTH_SHORT).show();
            if(ndefFormatable == null){
                Toast.makeText(this,"Tag is not ndef formatable !!! ",Toast.LENGTH_SHORT).show();

            }
            ndefFormatable.connect();
            // Toast.makeText(this,"st 7 ! ",Toast.LENGTH_SHORT).show();
            ndefFormatable.format(ndefMessage); // if there is a problem so it will be here
            //Toast.makeText(this,"st 8 ! ",Toast.LENGTH_SHORT).show();
            ndefFormatable.close();
            Toast.makeText(this,"Tag  written !!! ",Toast.LENGTH_SHORT).show();

        }catch (Exception e){
            Log.e("Format Tag ",e.getMessage());
        }

    }

    private NdefRecord createTextRecord(String content) {
        try {
            byte[] language;
            language = Locale.getDefault().getLanguage().getBytes("UTF-8");

            final byte[] text = content.getBytes("UTF-8");
            final int languageSize = language.length;
            final int textLength = text.length;
            final ByteArrayOutputStream payload = new ByteArrayOutputStream(1 + languageSize + textLength);

            payload.write((byte) (languageSize & 0x1F));
            payload.write(language, 0, languageSize);
            payload.write(text, 0, textLength);

            return new NdefRecord(NdefRecord.TNF_WELL_KNOWN, NdefRecord.RTD_TEXT, new byte[0], payload.toByteArray());

        } catch (UnsupportedEncodingException e) {
            Log.e("createTextRecord", e.getMessage());
        }
        return null;
    }

}
