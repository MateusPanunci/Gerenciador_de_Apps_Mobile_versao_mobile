package br.uel.Apps_Mobile.Controller;

import br.uel.Apps_Mobile.Model.AppMobile;
import br.uel.Apps_Mobile.Service.AppsMobileService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/apps")
public class AppsMobileController {

    private final AppsMobileService service;

    @Autowired
    public AppsMobileController(AppsMobileService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AppMobile>> listar(HttpSession session){
        String nome = (String) session.getAttribute("filtro");
        System.out.println(nome);

        List<AppMobile> apps;
        if (nome != null && !nome.isEmpty()) {
            apps = service.buscarPorNome(nome);
        } else {
            apps = service.listar();
        }

        if (apps != null) {
            return ResponseEntity.ok(apps);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        }
    }

    @GetMapping("/limpar")
    public ResponseEntity<?> limparFiltro(HttpSession session) {
        session.setAttribute("filtro", null);
        return ResponseEntity.ok().build(); 
    }

    @PostMapping("/filtro")
    public ResponseEntity<?> aplicarFiltro(@RequestParam("nome") String nome, HttpSession session){
          session.setAttribute("filtro", nome);
          return ResponseEntity.status(HttpStatus.OK).body(nome);
    }

    @GetMapping("/novo")
    public ResponseEntity<AppMobile> abrirCadastro(){
        AppMobile app = new AppMobile();
        return ResponseEntity.status(HttpStatus.OK).body(app);
    }

    @GetMapping("/editar/{id}")
    public ResponseEntity<?> abrirEdicao(@PathVariable Long id) {
        try {
            AppMobile app = service.buscar(id);
            return ResponseEntity.status(HttpStatus.OK).body(app);
        } catch (RuntimeException e){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrarApp(@Valid @RequestBody AppMobile app, BindingResult erros) {
        if (erros.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError erro : erros.getFieldErrors()) {
                errorMap.put(erro.getField(), erro.getDefaultMessage());
                System.out.println(erro.getField() + ": " + erro.getDefaultMessage());
            }
            System.out.println("Deu erro");
            return ResponseEntity.badRequest().body(errorMap);
        }

        try {
            service.adicionar(app);
            System.out.println("Deu certo");

            return ResponseEntity.status(HttpStatus.CREATED).body(app);
        } catch (DataIntegrityViolationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Já há um App cadastrado com o nome " + app.getNome() + "!");
            System.out.println("Já há um App cadastrado com o nome " + app.getNome() + "!");


            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.status(HttpStatus.OK).body("App Mobile removido!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id, 
            @Valid @RequestBody AppMobile appAtualizado, 
            BindingResult erros) { 

        if (erros.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError erro : erros.getFieldErrors()) {
                errorMap.put(erro.getField(), erro.getDefaultMessage()); 
            }
            return ResponseEntity.badRequest().body(errorMap);
        }
        try {
            service.atualizar(id, appAtualizado);
            return ResponseEntity.status(HttpStatus.OK).body("App Mobile atualizado!");
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}