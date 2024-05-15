package com.ensa.jibi.mappers;

public interface Mapper<A,B> {
    B mapTo(A a);
    A mapFrom(B b);
}