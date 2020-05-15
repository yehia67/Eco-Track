package com.example.product_reader;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatDialogFragment;

import java.net.InterfaceAddress;

public class UpdateDialog extends AppCompatDialogFragment {

    private EditText update_et ;
    private UpdateDialogListener listener ;

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        LayoutInflater inflater = getActivity().getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.update_dialog, null);
        builder.setView(dialogView).setTitle("Update request")
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                })
                .setPositiveButton("Submit", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        String update_message = update_et.getText().toString();
                        listener.applyText(update_message);
                    }
                });

        update_et = (EditText) dialogView.findViewById(R.id.update_et);

        return builder.create();

    }

    @Override
    public void onAttach(@NonNull Context context) {
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
