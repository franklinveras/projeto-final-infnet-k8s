// Importa módulos do k6
import http from "k6/http";
import { check, sleep } from "k6";

// Configuração do teste
export const options = {
  thresholds: {
    // Garante que 99% das requisições sejam concluídas em até 3000ms.
    http_req_duration: ["p(99) < 3000"],
  },
  // Aumenta e diminui gradualmente o número de usuários virtuais
  stages: [
    { duration: "30s", target: 15 },
    { duration: "1m", target: 15 },
    { duration: "20s", target: 0 },
  ],
};

// Recebe IP e porta via argumentos de linha de comando
const url = "http://192.168.49.2:30688/htmltopdf";


// Comportamento simulado do usuário
export default function () {
  let res = http.post(url, {
    html: `
    <html>
      <body>
        <h1>Integração Contínua, DevOps e Computação em Nuvem [25E1_3] - Franklin Sertão - Teste Kubernetes</h1>
      </body>
    </html>`,
    footer: "Footer text",
  });
    
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}