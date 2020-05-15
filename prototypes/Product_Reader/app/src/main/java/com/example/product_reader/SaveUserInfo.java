package com.example.product_reader;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;
import io.paperdb.Paper;
import static android.content.Context.MODE_PRIVATE;
import static android.widget.Toast.LENGTH_LONG;
import static java.lang.Character.isLowerCase;

public class SaveUserInfo {


    public boolean checkInfo(String _fname,String _lname ,String _email,String _address) {
        if(_fname.length() >0  && _lname.length() >0 && _email.length() >0 && _address.length() >0 ){
            return true ;
        }
        else {
            return false ;
        }
    }


    public  void storeUserInfo(String _fname,String _lname ,String _email,String _address,Context _context){
        try {
//            SharedPreferences.Editor editor = _context.getSharedPreferences("My info", MODE_PRIVATE).edit();
//            editor.putString("First name", _fname);
//            editor.putString("Last name", _lname);
//            editor.putString("Email", _email);
//            editor.putString("address", _address);
//            editor.apply();
              Paper.book("My_Info").write("First name",_fname);
              Paper.book("My_Info").write("Last name",_lname);
              Paper.book("My_Info").write("Email",_email);
              Paper.book("My_Info").write("Address",_address);
            Toast.makeText(_context,"Your info stored successfully!", LENGTH_LONG).show();

        }catch (Exception e){
            Toast.makeText(_context,"Please Fill all the Fields", LENGTH_LONG).show();

        }
    }
}
