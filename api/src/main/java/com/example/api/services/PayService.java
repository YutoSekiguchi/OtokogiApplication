package com.example.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.Pay;
import com.example.api.repositories.PayRepository;

//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.persistence.TypedQuery;

@Service
public class PayService {
	@Autowired
	private PayRepository payRepository;
	
	public Pay getPayByIdWithMemberName(Long payId) {
        return payRepository.findById(payId).orElse(null);
    }
	
//	@PersistenceContext
//    private EntityManager entityManager;
//
//    public List<Object[]> getPayAndMemberDataByRecordId(Long rid) {
//        String jpql = "SELECT p, m.name FROM Pay p JOIN Member m ON p.mid = m.id WHERE p.rid = :rid";
//
//        TypedQuery<Object[]> query = entityManager.createQuery(jpql, Object[].class);
//        query.setParameter("rid", rid);
//
//        return query.getResultList();
//    }
}