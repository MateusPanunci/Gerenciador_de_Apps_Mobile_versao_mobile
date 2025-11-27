package br.uel.Apps_Mobile.Controller;

import br.uel.Apps_Mobile.Model.AppMobile;
import br.uel.Apps_Mobile.Service.AppsMobileService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


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
            return ResponseEntity.ok(apps); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT FOUND).body(null); // 404 NOT FOUND

        }

    @GetMapping("/limpar")
    public ResponseEntity<?> limparFiltro(HttpSession session) {
        session.setAttribute("filtro", null);;
        return ResponseEntity.ok;
    }
//    @GetMapping("/buscar")
//    public String buscar(@RequestParam("nome") String nome, Model model, RedirectAttributes ra){
//        try {
//            model.addAttribute("appBuscado", service.buscar(nome));
//            return "busca";
//        }
//        catch(RuntimeException e){
//            ra.addFlashAttribute("buscainvalida", e.getLocalizedMessage());
//            return "redirect:/apps";
//        }
//    }

    @PostMapping("/filtro")
    public ResponseEntity<?>  aplicarFiltro(@RequestParam("nome") String nome, HttpSession session){
          session.setAttribute("filtro", nome);
          return return ResponseEntity.status(HttpStatus.OK).body(nome);
    }


    @GetMapping("/novo")
    public ResponseEntity<AppMobile> abrirCadastro(){
        AppMobile app = new AppMobile();
        
        return ResponseEntity.status(HttpStatus.OK).body(app); //"form"
    }

    @GetMapping("/editar/{id}")
    public ResponseEntity<?> abrirEdicao(@PathVariable Long id) {
        try {
            AppMobile app = service.buscar(id);
            return ResponseEntity.status(HttpStatus.OK).body(app);
        } catch (RuntimeException e){
            return responseEntity.status(HttpStatus.NOT FOUND).body(e.getMessage());
        }
    }

    @PostMapping // Mantenha o mapeamento, assumindo que a classe tenha o path base
    public ResponseEntity<?> cadastrarApi(
        @Valid @RequestBody AppMobile app, // 1. Use @RequestBody para receber JSON
        BindingResult erros) 
    {
        // --- 2. Tratamento de Erros de Validação (400 Bad Request) ---
        if (erros.hasErrors()) {
            
            // Cria um Map para retornar os erros em formato JSON
            Map<String, String> errorMap = new HashMap<>();

            // Coleta todos os erros de campo
            for (FieldError erro : erros.getFieldErrors()) {
                // O erro.getDefaultMessage() é o que deveria estar no JSON
                errorMap.put(erro.getField(), erro.getDefaultMessage()); 
            }

            // Retorna o status HTTP 400 (Bad Request) com o mapa de erros JSON
            return ResponseEntity.badRequest().body(errorMap);
        }

        // --- 3. Lógica de Negócio (201 Created) ---
        try {
            // Adiciona o App e o retorna (melhor prática para 201 Created)
            AppMobile appSalvo = service.adicionar(app); 

            // Retorna o status HTTP 201 (Created) e o objeto criado no corpo da resposta
            return ResponseEntity.status(HttpStatus.CREATED).body(appSalvo);

        } catch (DataIntegrityViolationException e) {
            // --- 4. Tratamento de Erros de Integridade (409 Conflict) ---

            // Você pode usar o status 409 Conflict ou 400 Bad Request. 
            // 409 é mais específico para conflito de recursos (nome duplicado)

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Já há um App cadastrado com o nome " + app.nome + "!");

            return responseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.status(HttpStatus.OK).body("App Mobile removido!");
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody AppMobile appAtualizado) {
        if (erros.hasErrors()) {

            // Cria um Map para retornar os erros em formato JSON
            Map<String, String> errorMap = new HashMap<>();

            // Coleta todos os erros de campo
            for (FieldError erro : erros.getFieldErrors()) {
                errorMap.put(erro.getField(), erro.getDefaultMessage()); 
            }
            return ResponseEntity.badRequest().body(errorMap);
        }
        try {
            service.atualizar(id, app);
            return ResponseEntity.status(HttpStatus.OK).body("App Mobile atualizado!");
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT FOUND).body(e.getMessage());
        }
    }
}
