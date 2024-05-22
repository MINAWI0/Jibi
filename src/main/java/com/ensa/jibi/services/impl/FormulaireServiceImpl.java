package com.ensa.jibi.services.impl;

import com.ensa.jibi.classes.Champ;
import com.ensa.jibi.classes.FieldType;
import com.ensa.jibi.classes.Formulaire;
import com.ensa.jibi.domain.enums.RechargeAmmount;
import com.ensa.jibi.services.FormulaireService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormulaireServiceImpl implements FormulaireService {

    @Override
    public Formulaire getFormulaireByCReance(String type) {
        Formulaire formulaire = new Formulaire();
        formulaire.setType(type);
        List<Champ> champs = new ArrayList<>();
        switch(type.toLowerCase()){
            case  "donation" :
                champs.add(new Champ("nomDonateur", FieldType.String));
                champs.add(new Champ("montant", FieldType.Double));
                break;
            case "facture":
                champs.add(new Champ("numFacture", FieldType.Long));
                champs.add(new Champ("email", FieldType.String));
                break;
            case "recharge" :
                List<String> rechargeOptions = Arrays.stream(RechargeAmmount.values())
                        .map(Enum::name)
                        .collect(Collectors.toList());
                champs.add(new Champ("montant",FieldType.Enum,rechargeOptions));
                champs.add(new Champ("email", FieldType.String));
                break;
            default:
                throw new IllegalArgumentException("Type de creance inconnu" + type);
        }
        formulaire.setChamps(champs);

        return formulaire;
    }
}
