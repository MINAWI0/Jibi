package com.ensa.jibi.domain.enums;

public enum RechargeAmmount {
    RECHARGE_AMMOUNT_10(10),
    RECHARGE_AMMOUNT_20(20),
    RECHARGE_AMMOUNT_50(50),
    RECHARGE_AMMOUNT_70(70),
    RECHARGE_AMMOUNT_80(80),
    RECHARGE_AMMOUNT_90(90),
    RECHARGE_AMMOUNT_100(100);

    private final int value;

    RechargeAmmount(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
