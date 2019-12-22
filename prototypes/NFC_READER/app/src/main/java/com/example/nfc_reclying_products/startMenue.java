package com.example.nfc_reclying_products;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;

import static android.widget.Toast.LENGTH_LONG;

public class startMenue extends AppCompatActivity {
    Button clientAppButton ;
    private static final String baseUrl = "http://192.168.1.4:5002/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_menue);
        clientAppButton =(Button)findViewById(R.id.clientAppButton);
        clientAppButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //-------------------------------------------------------------------------------------------------------
                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                StringRequest testRequest = new StringRequest(Request.Method.GET,baseUrl+"test",new Response.Listener<String>(){
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

                StringRequest initRequest = new StringRequest(Request.Method.GET,baseUrl+"init",new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(),"Api init response : "+response.toString(), LENGTH_LONG).show();
                    }
                }, new Response.ErrorListener(){
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(),error.toString(), LENGTH_LONG).show();
                    }
                });
                requestQueue.add(testRequest);
                requestQueue.add(initRequest);
                //-------------------------------------------------------------------------------------------------------
                Intent clientApp = new Intent(getApplicationContext() ,MainActivity.class);
                startActivity(clientApp);

            }
        });
    }

}
