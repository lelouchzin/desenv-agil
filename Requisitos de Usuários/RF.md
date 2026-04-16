# Requisitos Funcionais

A tabela a seguir contém os Requisitos Funcionais (RF) do sistema MedTrack.

| ID   | Requisito                                                                 | Prioridade | Requisitos Relacionados |
|------|--------------------------------------------------------------------------|-----------|------------------------|
| RF01 | O usuário deve poder cadastrar medicamentos.                             | Alta      | -                      |
| RF02 | O usuário deve poder definir dosagem, unidade e frequência de uso.       | Alta      | RF01                   |
| RF03 | O usuário deve poder definir múltiplos horários de administração.        | Alta      | RF02                   |
| RF04 | O sistema deve exibir um painel diário com as doses do dia.              | Alta      | RF03                   |
| RF05 | O sistema deve permitir marcar doses como tomadas ou puladas.            | Alta      | RF04                   |
| RF06 | O sistema deve enviar avisos de medicamentos pendentes.                  | Média     | RF04                   |
| RF07 | O sistema deve notificar sobre medicamentos atrasados.                   | Média     | RF06                   |
| RF08 | O sistema deve registrar histórico de doses (tomadas/puladas).           | Alta      | RF05                   |
| RF09 | O usuário deve poder visualizar seu progresso diário.                    | Média     | RF04                   |
| RF10 | O usuário deve poder editar ou remover medicamentos cadastrados.         | Média     | RF01                   |
