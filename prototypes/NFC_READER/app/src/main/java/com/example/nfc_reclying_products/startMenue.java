package com.example.nfc_reclying_products;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class startMenue extends AppCompatActivity {
    Button clientAppButton ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_menue);
        clientAppButton =(Button)findViewById(R.id.clientAppButton);
        clientAppButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent clientApp = new Intent(getApplicationContext() ,MainActivity.class);
                startActivity(clientApp);
            }
        });
    }
}
