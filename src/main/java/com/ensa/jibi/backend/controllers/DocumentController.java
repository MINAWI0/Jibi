package com.ensa.jibi.backend.controllers;

import com.ensa.jibi.backend.domain.dto.DocumentDto;
import com.ensa.jibi.backend.domain.entities.Document;
import com.ensa.jibi.backend.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping
    public ResponseEntity<Document> saveDocument(@RequestBody DocumentDto documentDto) {
        Document savedDocument = documentService.save(documentDto);
        return ResponseEntity.ok(savedDocument);
    }

    @GetMapping("/client/{numTel}")
    public ResponseEntity<List<Document>> getDocumentsByClient(@PathVariable String numTel) {
        List<Document> documents = documentService.findByClient_NumTel(numTel);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/agent/{numTel}")
    public ResponseEntity<List<Document>> getDocumentsByAgent(@PathVariable String numTel) {
        List<Document> documents = documentService.findByAgent_NumTel(numTel);
        return ResponseEntity.ok(documents);
    }
}
