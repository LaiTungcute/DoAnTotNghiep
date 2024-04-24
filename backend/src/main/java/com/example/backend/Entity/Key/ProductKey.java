package com.example.backend.Entity.Key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProductKey implements Serializable {
    @Column(name = "product_id")
    private int product_id;

    @Column(name = "gender_id")
    private int gender_id;
}
