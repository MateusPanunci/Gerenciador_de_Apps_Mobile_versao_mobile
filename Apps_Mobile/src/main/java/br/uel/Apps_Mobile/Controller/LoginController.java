package br.uel.Apps_Mobile.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController // 1. Mude para @RestController
public class LoginRestController {

    // Se o objetivo é apenas verificar o status de login na raiz ("/")
    @GetMapping("/")
    public Map<String, Object> checkLoginStatus(HttpSession session) {
        Object usuario = session.getAttribute("usuarioLogado");

        Map<String, Object> response = new HashMap<>();

        if (usuario != null) {
            // 2. Retorna dados (ex: JSON), não um nome de view ou redirect
            response.put("status", "success");
            response.put("message", "Usuário já logado.");
            response.put("redirect", "/apps"); 
        } else {
            response.put("status", "error");
            response.put("message", "Nenhum usuário logado. Necessário fazer login.");
            response.put("redirect", "/login"); // Ou apenas indica que o login é necessário
        }

        return response;
    }
}