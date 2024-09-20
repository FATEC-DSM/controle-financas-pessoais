# controle-financas-pessoais

Plataforma web que permita aos usuários gerenciar suas finanças pessoais de forma eficiente, fornecendo ferramentas para o controle de receitas, despesas, orçamento, e relatórios financeiros.

# Git Flow

## Índice

1. [Branches](#branches)
2. [Ambientes](#ambientes)
3. [Convenções de nome de branch](#convenções-de-nome-de-branch)
4. [Pull Requests](#pull-requests)
5. [Fazendo merge via Pull Request](#fazendo-merge-via-pull-requests)
6. [Guia de commits](#guia-de-commits)
7. [Iniciar repositório com as branches principais](#iniciar-repositório-com-as-branches-principais)
8. [Fluxo de branches de feature](#fluxo-de-branches-de-feature)
9. [Fluxo de branches de hotfix](#fluxo-de-branches-de-hotfix)
10. [Fluxo de branches de release](#fluxo-de-branches-de-release)
11. [Leitura obrigatória](#leitura-obrigatória)

## Branches

- master - sempre **estável** e **pronta para lançamento**;
- development - branch padrão, contém as últimas **funcionalidades** e **correções**, na qual os desenvolvedores devem se orientar;
- feature-\* - branches para desenvolvimento de funcionalidades e atualização de dependências;
- release-\* - branches para versão de produção;
- hotfix-\* - branches para correções na versão de produção;
- refactor-\* - branches para mudanças semânticas;

## Ambientes

- master - produção;
- development - homologação;
- release-\* - para motivos históricos ou para suportar várias versões em produção;
- feature-\* - implantação contínua em ambiente de testes;
- hotfix-\* - desenvolvimento (local);

## Convenções de nome de branch

Os nomes de branches devem conter apenas letras minúsculas, números e hífens, regexp: /[a-z0-9\-]+/

**Importante**: Por que não usar barras, como em outros fluxos git, por exemplo, o de Vincent Driessen? Porque no caso de implantação contínua, um branch como "feature-ui-auth" será implantado como "ui-auth.project.com", por isso devemos usar apenas símbolos permitidos para nomes DNS.

## Pull Requests

- Para cada pull request, deve ser criado um ‘issue’ correspondente (exceto para documentação);
- _Nota_: o issue deve responder: o que deve ser feito e por quê?;
- O Pull Request deve conter uma descrição explicando o que foi feito e como afeta o projeto;
- _Nota_: O Pull Request deve ter uma descrição que explique o que foi feito e como isso afeta o projeto;
- O issue corrigido deve ser mencionado no final do nome do Pull Request: "[fixes #123]" (mesmo para nomes de commit);
- Os Pull Requests devem ser pequenos e focados (veja "Guia de commits");
- Todos os pull requests devem atender à Definição de Pronto (DoD) e aos Critérios de Aceitação utilizados pela equipe do projeto;
- Os commits no pull request devem seguir as convenções de código correspondentes.

**Importante**: mantenha mudanças semânticas (refatoração, renomeações) e atualizações de bibliotecas como pull requests separados.

## Fazendo merge via Pull Requests

Esse fluxo será usado quase em qualquer fluxo de branch, então preste atenção!

1. [Criar PR](https://help.github.com/articles/creating-a-pull-request/) da branch atual para a branch de destino

- _Nota_: as branches de origem e destino dependem do que você está fazendo; veja os fluxos de branches abaixo;
- _Nota_: exceto para branches de hotfix, a branch de destino é development;
- Atribua o PR a si mesmo;
- Adicione os rótulos correspondentes.

2. Quando você terminar as alterações na branch:

- _Opcional_: você pode reorganizar seus commits de forma interativa usando `git rebase -i`.

```bash
# fazer checkout da branch atual
git checkout current-branch
# buscar as alterações mais recentes
git fetch origin --prune
# fazer rebase em cima da branch development
git rebase origin/development
```

- Em caso de conflitos de merge, resolva-os :)

  - Enquanto estiver fazendo rebase:

```bash
# rodar ferramenta de merge
git mergetool
# limpar após merge
find -name "*.orig" -delete
# continuar o rebase
git rebase --continue
# repita esses passos até que todos os conflitos sejam resolvidos
```

    * Para abortar o rebase e usar merge:

```bash
# abortar o rebase
git rebase --abort
# fazer merge das últimas alterações da branch development para a branch atual
git merge origin/development
```

- O link para o PR deve ser enviado no chat da sua equipe solicitando revisão de código (revisão de código é obrigatória, pois realmente ajuda a acelerar o processo);

_Exemplo_: "Por favor, revise meu Pull Request: https://github.com/org/projeto/pull/1".

3. Se houver notas de revisão de código que precisem ser aplicadas, aplique-as e volte ao passo 2.

4. Quando o Pull Request for aprovado por pelo menos 2 membros da equipe:

- _Nota_: você pode usar um :+1: como aprovação.
- _Nota_: o revisor que deu a segunda aprovação pode notificar o autor do PR para agilizar o processo;
- Quando o pull request receber 2 aprovações, ele deve ser mesclado pelo **autor do código**.

<!--5. A branch de feature deve ser deletada ao mesclar o PR-->

## Guia de commits

**Importante**:

- Commits sem o ID da tarefa (link para o Asana) não são permitidos (exceto para documentação e atualizações de versão de bibliotecas);
- Mantenha o incremento da versão do aplicativo em commits separados.

Faça as alterações no código e nos testes e depois faça o commit para sua branch. Certifique-se de seguir as convenções de mensagem de commit.

Os resumos das mensagens de commit devem seguir este formato básico:

Tag: Mensagem [Action #1234]

A Tag é uma das seguintes:

- Fix - para correção de bug.
- Update - para melhorias compatíveis com versões anteriores.
- Breaking - para melhorias incompatíveis com versões anteriores.
- Docs - apenas alterações na documentação.
- Build - apenas alterações no processo de build.
- New - implementação de uma nova funcionalidade.
- Upgrade - para atualização de dependências.

A mensagem é uma descrição curta do que foi feito.

A ação - depende da ferramenta de rastreamento de tarefas, mas, em geral:

- refs - vincula o commit à tarefa;
- fixes - encerra a tarefa, movendo-a para o estado de teste.

**Importante**: Use fixes apenas no nome do Pull Request.

## Iniciar repositório com as branches principais

A branch master deve estar presente em qualquer repositório por padrão.

Crie a branch development e defina-a como padrão no GitHub.

```bash
git checkout -b development origin/master
# alterne para a nova branch 'development'
git push origin development
```

No GitHub:

- Abra as Configurações do repositório -> Opções -> Seção de Configurações;
- Defina development como a branch padrão (isso facilitará a criação de Pull Requests no futuro).

## Fluxo de branches de feature

- A branch de feature deve começar da branch development e ser mesclada de volta.
- Não deve alterar a versão (a versão será alterada ao criar a release).

1. Crie a branch de feature a partir do estado atual da branch development:

```bash
# atualize seu repositório local com as alterações mais recentes
git fetch origin --prune
# crie a branch de feature a partir da cabeça da branch development
git checkout -b feature-you-will-do origin/development
```

2. Crie um Pull Request quando a implementação da feature estiver concluída.

3. Siga o processo de revisão do Pull Request.

4. Limpe o repositório local.

```bash
# origin/feature será removido pelo GitHub
git fetch origin --prune
git branch -d feature-you-will-do
```

5. Se a mesclagem automática do PR não estiver disponível, faça o merge da branch development para a branch de feature localmente e comece do passo 3.

```bash
git fetch origin --prune
git pull origin
git checkout feature-you-will-do
git merge development
# se a mesclagem automática do Pull Request não estiver disponível,
# significa que há conflitos de merge que devem ser resolvidos localmente
git mergetool
# remova os arquivos temporários após o merge
find -name "*.orig" -delete
# a mensagem de commit será gerada automaticamente, sem necessidade de mensagem de commit
git commit
git push origin feature-you-will-do
```

6. Limpe as branches.

```bash
git fetch origin --prune
git checkout development
git pull origin development
# apague a branch remota
git push origin :feature-you-will-do
# apague a branch local
git branch -d feature-you-will-do
```

## Fluxo de branches de hotfix

- Deve ser usado apenas para corrigir bugs em produção.
- A branch de hotfix deve começar da branch master e ser mesclada de volta para master e development.
- A branch de hotfix pode começar a partir da branch release e deve ser mesclada de volta para release, master e development.
- **Importante**: o nome da branch de hotfix contém o número completo da versão.
- **Importante**: o número da versão será incrementado no final da correção.

1. Crie a branch de hotfix a partir do estado atual da branch master:

```bash
git fetch origin --prune
# crie a branch de hotfix a partir da branch master
git checkout -b hotfix-1.0.0 origin/master
```

2. Se já houver uma branch release aberta, faça o merge da branch release na branch de hotfix.

```bash
git checkout hotfix-1.0.0
git merge release-1.0.0
```

3. Faça o merge da branch master na branch de hotfix e crie o Pull Request.
4. Faça o merge da branch development na branch de hotfix e crie o Pull Request.

## Fluxo de branches de release

- Deve ser usado para preparar uma nova versão.
- A branch de release começa a partir da branch development e é mesclada de volta para master e development.
- O nome da branch de release contém o número completo da versão.

1. Crie a branch de release a partir do estado atual da branch development:

```bash
git fetch origin --prune
# crie a branch de release a partir da cabeça da branch development
git checkout -b release-1.0.0 origin/development
```

2. Encerre a branch de release criando um Pull Request da branch release para master.
```markdown
Quando a release estiver totalmente testada e pronta para produção, inicie um Pull Request para a branch master.

Nota: se você tiver Integração Contínua, ao fechar o Pull Request, a implantação para produção será iniciada, então esteja preparado e escolha um momento apropriado (não numa sexta-feira à noite!).

Finalize a release

Nota: podem ocorrer conflitos de merge

```bash
# obter o estado mais recente da master
git checkout master
git pull origin master

# adicionar uma tag de release ao commit de merge
git tag -a 1.2

# enviar a tag para o repositório
git push origin master --tags
```

```bash
# mesclar a release de volta para a branch development
git checkout development
git pull origin development
git merge master
git push origin development --tags
```

**Apague a branch de release e utilize as tags**

## Casos de uso

Remover todas as branches locais:

```bash
git branch -l | egrep -v "^\*|master|development" | xargs -n 1 git branch -D
```

## Leitura Obrigatória

Preste atenção ao Feature Branching com Pull Requests.

- Experimente GitHub
- Tutorial Git Atlassian (exceto Migrate to Git from SVN)
- Feature branching clássico por Martin Fowler
- Modelo de branching mais próximo ao nosso por Vincent Driessen
- Cheatsheet git-flow de Vincent Driessen (ru)

## Leituras de apoio
- [Referência desse Gitflow](https://github.com/valor-software/valor-style-guides/blob/master/gitflow/readme.md)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Git cheat sheet](https://www.git-tower.com/blog/git-cheat-sheet)
- [Ajuda do GitHub: colaborando com usuários](https://help.github.com/articles/collaborating-with-issues-and-pull-requests/)


