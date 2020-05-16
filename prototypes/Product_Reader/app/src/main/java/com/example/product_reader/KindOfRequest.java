package com.example.product_reader;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.text.method.ScrollingMovementMethod;

import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.TimeUnit;

import io.paperdb.Paper;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class KindOfRequest extends AppCompatActivity implements UpdateDialog.UpdateDialogListener {
    Intent product_address_intent ;
    TextView product_address_tv ,info_tv ;
    String product_address ,fname ,lname,email,current_data ,message ;
    Button get_product_info_btn ,get_product_history_btn,get_producer_info_btn,update_status_btn ,submit_btn ;
    ApiPlaceHolder apiPlaceHolder ;
    Calendar calendar ;
    JSONObject update_object ;
    Update update = new Update();
    ArrayAdapter<String> arrayAdapter ;
    ArrayList<String> arrayList ;


    public void  openInfo(String title,String str){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        View view = getLayoutInflater().inflate(R.layout.listview,null);
        ListView lv =(ListView) view.findViewById(R.id.lv);
        arrayList = new ArrayList<>();
        arrayList.add(str);
        arrayAdapter = new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,arrayList);
        lv.setAdapter(arrayAdapter);
        arrayAdapter.notifyDataSetChanged();
        builder.setView(view).setTitle(title);
        AlertDialog alertDialog = builder.create();
        alertDialog.show();

    }

    public void openHistory(String title ,ArrayList arrlst){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        View view = getLayoutInflater().inflate(R.layout.listview,null);
        ListView lv =(ListView) view.findViewById(R.id.lv);
        arrayAdapter = new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,arrlst);
        lv.setAdapter(arrayAdapter);
        arrayAdapter.notifyDataSetChanged();
        builder.setView(view).setTitle(title);
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }


    @Override
    public void applyText(String update_message) {
        String qr_code = product_address_tv.getText().toString();
        message = update_message ;
        if(message.length()>0){
            update_object = new JSONObject();
            try {
                update_object.put("fname",fname);
                update_object.put("lname",lname);
                update_object.put("Email",email);
                update_object.put("Date",current_data);
                update_object.put("Message",message);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            update.setQrCode(qr_code);
            update.setUpdateObject(update_object);
            Call<String> call = apiPlaceHolder.putUpdate(update);
            call.enqueue(new Callback<String>() {
                @Override
                public void onResponse(Call<String> call, Response<String> response) {
                    if(!response.isSuccessful()){
                        info_tv.setText("code"+response.code());
                        get_product_info_btn.setEnabled(true);
                        get_product_history_btn.setEnabled(true);
                        get_producer_info_btn.setEnabled(true);
                        return;
                    }
                    else {
                        // ProductInfo product_info = response.body();
                        String response_string = response.body();

                        //info_tv.setText(response_string);
                        get_product_info_btn.setEnabled(true);
                        get_product_history_btn.setEnabled(true);
                        get_producer_info_btn.setEnabled(true);
                        info_tv.setText("");
                        info_tv.setVisibility(View.INVISIBLE);
                        openUpdateResult(response_string);


                    }
                }

                @Override
                public void onFailure(Call<String> call, Throwable t) {
                    info_tv.setText(t.getMessage());
                    Log.i("response","haaaay    "+t.getMessage());
                    get_product_info_btn.setEnabled(true);
                    get_product_history_btn.setEnabled(true);
                    get_producer_info_btn.setEnabled(true);
                }
            });
        }
        else {
            get_product_info_btn.setEnabled(true);
            get_product_history_btn.setEnabled(true);
            get_producer_info_btn.setEnabled(true);
        }
    }

    public void openUpdateResult(String response){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(response);
        builder.setNegativeButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
builder.show();
    }

    public void openUpdateDialog(){
        UpdateDialog updateDialog = new UpdateDialog();
        updateDialog.show(getSupportFragmentManager(),"Update Request");

    }





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_kind_of_request);
        product_address_intent = getIntent();
        product_address_tv = (TextView) findViewById(R.id.product_address_tv);
        product_address = product_address_intent.getStringExtra(ScanProduct.key);
        product_address_tv.setText(product_address);
        get_product_info_btn = (Button)findViewById(R.id.get_info_btn);
        get_product_history_btn = (Button)findViewById(R.id.get_history_btn);
        get_producer_info_btn = (Button)findViewById(R.id.get_producer_info_btn);
        update_status_btn = (Button)findViewById(R.id.update_status_btn);
        info_tv = (TextView)findViewById(R.id.info_tv);
        info_tv.setMovementMethod(new ScrollingMovementMethod());
        submit_btn = (Button)findViewById(R.id.submit_btn);
      //  SharedPreferences sharedPreferences = getSharedPreferences("My info",MODE_PRIVATE);
        fname = Paper.book("My_Info").read("First name","Not Found") ;
        lname = Paper.book("My_Info").read("Last name","Not Found") ;
        email = Paper.book("My_Info").read("Email","Not Found") ;
        calendar = Calendar.getInstance();
        current_data = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());



        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .connectTimeout(2, TimeUnit.MINUTES)
                .readTimeout(2, TimeUnit.MINUTES)
                .writeTimeout(2, TimeUnit.MINUTES)
                .build();


        //instance of retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.1.3:4000/")
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiPlaceHolder = retrofit.create(ApiPlaceHolder.class);

        get_product_info_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String qr_code = product_address_tv.getText().toString();
                get_product_history_btn.setEnabled(false);
                get_producer_info_btn.setEnabled(false);
                update_status_btn.setEnabled(false);
                info_tv.setText("");
                info_tv.setVisibility(View.VISIBLE);

                //QrCode qr_code = new QrCode(product_address_tv.getText().toString());
                Call<JsonObject> call = apiPlaceHolder.getProductInfo(qr_code);
                call.enqueue(new Callback<JsonObject>() {
                    @Override
                    public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                        String product_info = "" ;
                        if(!response.isSuccessful()){
                            info_tv.setText("code"+response.code());
                           // openDialog("Error","code" +response.code());
                            openInfo("Error ","code" +response.code());
                            get_product_history_btn.setEnabled(true);
                            get_producer_info_btn.setEnabled(true);
                            update_status_btn.setEnabled(true);
                            return;
                        }
                        else {

                            JSONArray keys ;
                            JsonObject jsonObject = response.body();
                            try {
                                JSONObject jo2 = new JSONObject(jsonObject.toString());
                                keys = jo2.names();
                                Log.i("arraylistlength",String.valueOf(keys.length()));
                                for(int i = 0 ; i < keys.length() ;i++){
                                    String key = keys.getString(i) ;
                                    product_info = product_info + key + " : "+jo2.getString(key) +" \n";
                                }
                               // openDialog("Product Info " , product_info);
                                openInfo("Product Info ",product_info);

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }



                                get_product_history_btn.setEnabled(true);
                                get_producer_info_btn.setEnabled(true);
                                update_status_btn.setEnabled(true);
                                info_tv.setText("");
                                info_tv.setVisibility(View.INVISIBLE);


                        }
                    }

                    @Override
                    public void onFailure(Call<JsonObject> call, Throwable t) {
                        info_tv.setText(t.getMessage());
                       // openDialog("Error",t.getMessage());
                        openInfo("Error ",t.getMessage());
                        Log.i("response","haaaay    "+t.getMessage());
                        get_product_history_btn.setEnabled(true);
                        get_producer_info_btn.setEnabled(true);
                        update_status_btn.setEnabled(true);
                    }
                });
            }
        });

        get_product_history_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String qr_code = product_address_tv.getText().toString();
                get_product_info_btn.setEnabled(false);
                get_producer_info_btn.setEnabled(false);
                update_status_btn.setEnabled(false);
                info_tv.setText("");
                info_tv.setVisibility(View.VISIBLE);


                Call<ArrayList<JsonObject>> call = apiPlaceHolder.getProductHistory(qr_code);

                call.enqueue(new Callback<ArrayList<JsonObject>>() {
                    @Override
                    public void onResponse(Call<ArrayList<JsonObject>> call, Response<ArrayList<JsonObject>> response) {
                        String producer_info = "" ;
                        if(!response.isSuccessful()){
                            info_tv.setText("code"+response.code());
                            //openDialog("Error","code" +response.code());
                            openInfo("Error ","code" +response.code());
                            get_product_info_btn.setEnabled(true);
                            get_producer_info_btn.setEnabled(true);
                            update_status_btn.setEnabled(true);
                            return;
                        }
                        else {
                            // ProductInfo product_info = response.body();
                            ArrayList<String> product_history_list_str = new ArrayList<String>();
                            ArrayList<JsonObject>product_history_list = response.body();

                            for(JsonObject jsonObject : product_history_list){
                                JSONArray keys ;
                                try {
                                    JSONObject jo2 = new JSONObject(jsonObject.toString());
                                    keys = jo2.names();
                                    Log.i("arraylistlength",String.valueOf(keys.length()));
                                    for(int i = 0 ; i < keys.length() ;i++){
                                        String key = keys.getString(i) ;
                                        if(key.equals("nameValuePairs")){
                                            String string = jo2.getString(key).replaceAll("\"","")
                                                    .replaceAll(",","\n").
                                                    replaceAll("\\}", "").
                                                    replaceAll("\\{","").
                                                    replaceAll(":"," : ") ;
                                            producer_info = producer_info + string ;
                                            Log.i("ma2",string);
                                        }
                                        else{
                                            producer_info = producer_info + key + " : "+jo2.getString(key) +" \n";
                                        }
                                    }
                                    product_history_list_str.add(producer_info + "\n");


                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                            }
                           // openDialogForHistory("Product History " , product_history_list_str);
                            openHistory("Product History",product_history_list_str);
                            get_product_info_btn.setEnabled(true);
                            get_producer_info_btn.setEnabled(true);
                            update_status_btn.setEnabled(true);
                            info_tv.setText("");
                            info_tv.setVisibility(View.INVISIBLE);

                        }
                    }

                    @Override
                    public void onFailure(Call<ArrayList<JsonObject>> call, Throwable t) {
                        info_tv.setText(t.getMessage());
                        //openDialog("Error",t.getMessage());
                        openInfo("Error ","code" +t.getMessage());
                        Log.i("response","haaaay    "+t.getMessage());
                        get_product_info_btn.setEnabled(true);
                        get_producer_info_btn.setEnabled(true);
                        update_status_btn.setEnabled(true);
                    }
                });


            }
        });

        get_producer_info_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String qr_code = product_address_tv.getText().toString();
                //String key = qr_code.replaceAll(",,002","");
                String[] key_and_id = qr_code.split(",,");
                get_product_info_btn.setEnabled(false);
                get_product_history_btn.setEnabled(false);
                update_status_btn.setEnabled(false);
                info_tv.setText("");
                info_tv.setVisibility(View.VISIBLE);

                Call<JsonObject> call = apiPlaceHolder.getProducerInfo(key_and_id[0]);
                call.enqueue(new Callback<JsonObject>() {
                    @Override
                    public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                        String producer_info = "" ;
                        if(!response.isSuccessful()){
                            info_tv.setText("code"+response.code());
                           // openDialog("Error","code" +response.code());
                            openInfo("Error ","code" +response.code());
                            get_product_info_btn.setEnabled(true);
                            get_product_history_btn.setEnabled(true);
                            update_status_btn.setEnabled(true);
                            return;
                        }
                        else {
                            JSONArray keys ;
                            JsonObject jsonObject = response.body();
                            try {
                                JSONObject jo2 = new JSONObject(jsonObject.toString());
                                keys = jo2.names();
                                Log.i("arraylistlength",String.valueOf(keys.length()));
                                for(int i = 0 ; i < keys.length() ;i++){
                                    String key = keys.getString(i) ;
                                    producer_info = producer_info + key + " : "+jo2.getString(key) +" \n";

                                }
                                //openDialog("Producer Info " , producer_info);
                                openInfo("Producer Info ",producer_info);


                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            get_product_info_btn.setEnabled(true);
                            get_product_history_btn.setEnabled(true);
                            update_status_btn.setEnabled(true);
                            info_tv.setText("");
                            info_tv.setVisibility(View.INVISIBLE);
                           // openDialog("Producer's Info",jsonObject);

                        }
                    }

                    @Override
                    public void onFailure(Call<JsonObject> call, Throwable t) {
                        info_tv.setText(t.getMessage());
                       // openDialog("Error",t.getMessage());
                        openInfo("Error ",t.getMessage());
                        Log.i("response","haaaay    "+t.getMessage());
                        get_product_info_btn.setEnabled(true);
                        get_product_history_btn.setEnabled(true);
                        update_status_btn.setEnabled(true);
                    }
                });

            }
        });

        update_status_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openUpdateDialog();
                info_tv.setText("");
                info_tv.setVisibility(View.VISIBLE);
                get_product_info_btn.setEnabled(false);
                get_product_history_btn.setEnabled(false);
                get_producer_info_btn.setEnabled(false);
                //update_status_btn.setVisibility(View.INVISIBLE);
                //submit_btn.setVisibility(View.VISIBLE);
                //get_product_info_btn.setEnabled(false);
                //get_product_history_btn.setEnabled(false);
                //get_producer_info_btn.setEnabled(false);
                //info_tv.setVisibility(View.INVISIBLE);
               // message_et.setVisibility(View.VISIBLE);
                //message_et.setText("");
            }
        });

//        submit_btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                String qr_code = product_address_tv.getText().toString();
//                update_status_btn.setVisibility(View.VISIBLE);
//                submit_btn.setVisibility(View.INVISIBLE);
//
//                message = message_et.getText().toString();
//                if(message.length()>0){
//                        update_object = new JSONObject();
//                try {
//                    update_object.put("fname",fname);
//                    update_object.put("lname",lname);
//                    update_object.put("Email",email);
//                    update_object.put("Date",current_data);
//                    update_object.put("Message",message);
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//                update.setQrCode(qr_code);
//                update.setUpdateObject(update_object);
//                Call<String> call = apiPlaceHolder.putUpdate(update);
//                call.enqueue(new Callback<String>() {
//                    @Override
//                    public void onResponse(Call<String> call, Response<String> response) {
//                        if(!response.isSuccessful()){
//                            message_et.setText("code"+response.code());
//                            get_product_info_btn.setEnabled(true);
//                            get_product_history_btn.setEnabled(true);
//                            get_producer_info_btn.setEnabled(true);
//                            return;
//                        }
//                        else {
//                            // ProductInfo product_info = response.body();
//                            String response_string = response.body();
//                            message_et.setText("");
//
//                            message_et.append(response_string);
//                            get_product_info_btn.setEnabled(true);
//                            get_product_history_btn.setEnabled(true);
//                            get_producer_info_btn.setEnabled(true);
//
//
//                        }
//                    }
//
//                    @Override
//                    public void onFailure(Call<String> call, Throwable t) {
//                        message_et.setText(t.getMessage());
//                        Log.i("response","haaaay    "+t.getMessage());
//                        get_product_info_btn.setEnabled(true);
//                        get_product_history_btn.setEnabled(true);
//                        get_producer_info_btn.setEnabled(true);
//                    }
//                });
//            }
//                else {
//                    get_product_info_btn.setEnabled(true);
//                    get_product_history_btn.setEnabled(true);
//                    get_producer_info_btn.setEnabled(true);
//                }
//
//
//            }
//        });
    }
}
