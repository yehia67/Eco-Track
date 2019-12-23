package com.example.nfc_reclying_products;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.Timer;
import java.util.TimerTask;

import static android.widget.Toast.LENGTH_LONG;
import static android.widget.Toast.LENGTH_SHORT;

public class startMenue extends AppCompatActivity {
    Button clientAppButton ,trashAppButton;
    static final int requestCode = 2;
    private static final String baseUrl = "http://192.168.1.4:5002/";
    Intent clientApp ,trashApp;
    Intent trashAppIntentGo ;
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 2) {
            try {
                String scannedItem = data.getStringExtra(ScanNfcTag.key);
                StringBuilder sb = new StringBuilder();
                sb.append("product to be recycled address is ");
                sb.append(scannedItem);
                GiveReward(scannedItem);
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
        clientApp = new Intent(getApplicationContext() ,MainActivity.class);
        trashAppIntentGo = new Intent(getApplicationContext(),ScanForReward.class);
        clientAppButton =(Button)findViewById(R.id.clientAppButton);
        trashAppButton = (Button)findViewById(R.id.trashAppButton);
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
                 requestQueue.add(testRequest);

                //-------------------------------------------------------------------------------------------------------

                startActivity(clientApp);
            }
        });
        trashAppButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivityForResult(trashAppIntentGo ,requestCode);
            }
        });

    }
    //----------------------------------------------------------------------------------------------------------------
    public void GiveReward(String _productAdress){
        SharedPreferences sharedPreferences = getSharedPreferences("root", Context.MODE_PRIVATE);
        String rootAddress = sharedPreferences.getString("root", "404 address");
        if(!(rootAddress == "404 address")){
            try {
                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("root",rootAddress);
                jsonBody.put("productAddress",_productAdress);
                final String requestBody = jsonBody.toString();

                StringRequest stringRequest = new StringRequest(Request.Method.POST, baseUrl+"giveReward", new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getApplicationContext(),"response is "+response, LENGTH_LONG).show();
                        Toast.makeText(getApplicationContext(),"Send 1 i. Congrats", LENGTH_LONG).show();
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(),error.toString(), LENGTH_LONG).show();
                    }
                }) {
                    @Override
                    public String getBodyContentType() {
                        return "application/json; charset=utf-8";
                    }

                    @Override
                    public byte[] getBody() throws AuthFailureError {
                        try {
                            return requestBody == null ? null : requestBody.getBytes("utf-8");
                        } catch (UnsupportedEncodingException uee) {
                            VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                            return null;
                        }
                    }

                    @Override
                    protected Response<String> parseNetworkResponse(NetworkResponse response) {
                        String responseString = "";
                        if (response != null) {
                            responseString = String.valueOf(response.statusCode);
                            // can get more details such as response.headers
                        }
                        return Response.success(responseString, HttpHeaderParser.parseCacheHeaders(response));
                    }
                };
                stringRequest.setRetryPolicy(new DefaultRetryPolicy(
                        0,
                        DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                        DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));

                requestQueue.add(stringRequest);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        else {
            Toast.makeText(getApplicationContext(), rootAddress , LENGTH_SHORT).show();
        }

    }
    //-----------------------------------------------------------------------------------------------------------
}
