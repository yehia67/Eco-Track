package com.example.nfc_reclying_products;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatDialogFragment;

public class WalletAddress extends AppCompatDialogFragment {

    private EditText wallet_address_et ;
    private UpdateDialogListener listener ;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        LayoutInflater inflater = getActivity().getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.address_dialog,null);
        builder.setView(dialogView).setTitle("Enter your wallet's address")
                .setPositiveButton("Set", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        String update_message = wallet_address_et.getText().toString();
                        listener.applyText(update_message);
                    }
                });

        wallet_address_et = (EditText) dialogView.findViewById(R.id.wallet_address_et);

        return builder.create();
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            listener = (UpdateDialogListener)context;
        }catch (ClassCastException e){
            throw  new ClassCastException(context.toString()+"must implement UpdateDialogListener");
        }
    }

    public interface UpdateDialogListener{
        void applyText(String update_message);
    }
}
