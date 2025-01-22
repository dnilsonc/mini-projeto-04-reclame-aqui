const formulario = document.getElementById('formulario');

const validacoes = {
  nome: {
    regex: /^.+$/,
    mensagem: 'Nome é obrigatório.'
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mensagem: 'E-mail inválido.'
  },
  senha: {
    regex: /^.{8,}$/,
    mensagem: 'Senha deve ter pelo menos 8 caracteres.'
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    mensagem: 'CPF inválido. Formato: 000.000.000-00'
  }
};

function validarCampo(campoId) {
    const campo = document.getElementById(campoId);
    const feedback = document.getElementById(`${campoId}Feedback`);
    const valor = campo.value.trim();
    let valido = true;
  
    feedback.classList.remove('feedback-erro');
    campo.classList.remove('feedback-sucesso');
    
    if (campo.required && valor === '') {
      feedback.textContent = validacoes[campoId].mensagem;
      feedback.classList.add('feedback-erro');
      valido = false;
    } 
    else if (validacoes[campoId]?.regex && !validacoes[campoId].regex.test(valor)) {
      feedback.textContent = validacoes[campoId].mensagem;
      feedback.classList.add('feedback-erro');
      valido = false;
    } 
    
    campo.classList.toggle('invalido', !valido);
    
    if (valido) {
      feedback.textContent = '';
      campo.classList.add('feedback-sucesso'); 
    }
    
    return valido;
}
  
function validarFormulario() {
  let formularioValido = true;

  const campos = ['nome', 'email', 'senha', 'cpf', 'dataOcorrencia', 'mensagem'];
  
  campos.forEach(campoId => {
    const campoValido = validarCampo(campoId);
    formularioValido = formularioValido && campoValido;
  });

  return formularioValido;
}

document.querySelectorAll('input, textarea').forEach(campo => {
  campo.addEventListener('input', () => validarCampo(campo.id));
});

formulario.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (validarFormulario()) {
    alert('Formulário enviado com sucesso!');
    this.reset();
    document.querySelectorAll('.invalido').forEach(el => el.classList.remove('invalido'));
  }
});

formulario.addEventListener('reset', () => {
  document.querySelectorAll('.feedback').forEach(el => el.textContent = '');
  document.querySelectorAll('.invalido').forEach(el => el.classList.remove('invalido'));
  document.querySelectorAll('input').forEach(el => el.classList.remove('feedback-sucesso'));
  document.querySelectorAll('textarea').forEach(el => el.classList.remove('feedback-sucesso'));
});