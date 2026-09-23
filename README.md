@adoteiporamor - Sistema de Adoção de Animais
O @adoteiporamor é um aplicativo mobile desenvolvido para gerenciar e facilitar a adoção de animais, conectando de forma prática potenciais adotantes aos pets.

🛠️ Tecnologias Utilizadas
Framework Principal: React Native
Ambiente de Desenvolvimento: Expo
Armazenamento Local: AsyncStorage (@react-native-async-storage/async-storage)
Navegação: React Navigation (Stack e Bottom Tabs)
Manipulação de Listas: React Native Gesture Handler
⚙️ Funcionalidades Implementadas
Estrutura de Telas e Navegação
O projeto é estruturado através de Stacks de Navegação e um menu de abas persistente no rodapé (footer), composto por 5 fluxos:

Home: Tela inicial com os destaques e apresentação da plataforma.
Lista: Listagem dinâmica e inteligente de todos os animais disponíveis.
Detalhes: Informações completas do pet selecionado (porte, idade, descrição e contato).
Registro: Formulário estruturado para o cadastro de novos animais.
Perfil dos Animais: Tela dedicada à exibição dos atributos específicos de cada pet.
CRUD Funcional e Persistência
Persistência de Dados: Integração completa com o AsyncStorage para armazenamento local, permitindo salvar, carregar e deletar registros de forma permanente.
Listagem Inteligente: Os novos pets cadastrados são inseridos automaticamente no topo da listagem. A lista faz a intercalação dinâmica entre uma base de dados estática fixa e os novos registros salvos pelo usuário.
Normalização Automática: Validação inteligente da espécie informada (cão ou gato), aplicando automaticamente emojis decorativos no nome do animal, fotos padrões caso nenhuma imagem seja fornecida, preenchimento de porte padrão ("Médio") e formatação automatizada da string de idade.
🧠 Sensores Nativos Implementados
O aplicativo utiliza 3 sensores essenciais do dispositivo para enriquecer a experiência do usuário:

GPS: Para localização e mapeamento geográfico dos animais e dos adotantes.
Imagens: Integração nativa com a câmera ou galeria do aparelho para captura e exibição das fotos dos pets.
Rotação (Giroscópio/Acelerômetro): Captura a orientação espacial do aparelho para realizar ajustes dinâmicos de layout conforme a inclinação do dispositivo.
🚀 Como Instalar e Executar
