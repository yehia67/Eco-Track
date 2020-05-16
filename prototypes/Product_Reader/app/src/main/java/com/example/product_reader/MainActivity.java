package com.example.product_reader;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import io.paperdb.Paper;

public class MainActivity extends AppCompatActivity {
    SaveUserInfo manageUserInfo = new SaveUserInfo();
    EditText fnET,lnET,emailET,addressET ;
    TextView fnTV,lnTV,emailTV,addressTV;
    Button scanBtn,saveBtn;
    LinearLayout etVLL,tvVLL ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Paper.init(this);
        fnET = (EditText)findViewById(R.id.fnET);
        lnET = (EditText)findViewById(R.id.lnET);
        emailET = (EditText)findViewById(R.id.emailET);
        addressET = (EditText)findViewById(R.id.addressET);
        fnTV = (TextView) findViewById(R.id.fnTV);
        lnTV = (TextView) findViewById(R.id.lnTV);
        emailTV = (TextView) findViewById(R.id.emailTV);
        addressTV = (TextView) findViewById(R.id.addressTV);
        scanBtn = (Button) findViewById(R.id.scanBtn);
        saveBtn = (Button) findViewById(R.id.saveBtn);
        etVLL = (LinearLayout)findViewById(R.id.etVLL);
        tvVLL = (LinearLayout)findViewById(R.id.tvVLL);
        Intent scan_product = new Intent(this,ScanProduct.class);

        haveAccount();
        this.scanBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(scan_product);
            }
        });


    }


public void haveAccount(){
    String str = "404 address";
    //SharedPreferences sharedPreferences = getSharedPreferences("My info",MODE_PRIVATE);
    //String info = sharedPreferences.getString("Last name" ,"404 address");
    String info = Paper.book("My_Info").read("First name",str);

    if(!info.equals(str)){
        saveBtn.setVisibility(View.INVISIBLE);
        scanBtn.setVisibility(View.VISIBLE);
        etVLL.setVisibility(View.INVISIBLE);
        tvVLL.setVisibility(View.VISIBLE);
//        fnTV.setText("First name : "+sharedPreferences.getString("First name",str));
//        lnTV.setText("Last name : "+sharedPreferences.getString("Last name",str));
//        emailTV.setText("Email : "+sharedPreferences.getString("Email",str));
//        addressTV.setText("Address : "+sharedPreferences.getString("address",str));

        fnTV.setText("First name : "+Paper.book("My_Info").read("First name",str));
        lnTV.setText("Last name : "+Paper.book("My_Info").read("Last name",str));
        emailTV.setText("Email : "+Paper.book("My_Info").read("Email",str));
        addressTV.setText("Address : "+Paper.book("My_Info").read("Address",str));
    }


}

    public void storeAddress(View _view) {
        if (manageUserInfo.checkInfo(fnET.getText().toString(),lnET.getText().toString(),emailET.getText().toString(),addressET.getText().toString())) {
            try {
                manageUserInfo.storeUserInfo(fnET.getText().toString(),lnET.getText().toString(),emailET.getText().toString(),addressET.getText().toString(),getApplicationContext());
                haveAccount();
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(getApplicationContext(), " Fill all the Fields Please", Toast.LENGTH_SHORT).show();
        }

    }
}
