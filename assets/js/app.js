class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let id = this.getProximoId();
    
        localStorage.setItem(id, JSON.stringify(d));
        
        localStorage.setItem('id', id);
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');


    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    );

    if (despesa.validarDados()) {
        bd.gravar(despesa);
        $('#modalRegistraDespesa').modal('show');
        //  Alterando CSS baseado no resultado da verificação
        let modalHeader = document.querySelector('.modal-header');
        modalHeader.classList.add('text-success');

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerHTML = 'Registro inserido com sucesso';

        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = 'Despesa foi cadastrada com sucesso!';

        let modalFooterBtn = document.querySelector('#modalFooterBtn');
        modalFooterBtn.innerHTML = 'Voltar';
        modalFooterBtn.classList.add('btn-success');
    } else {
        $('#modalRegistraDespesa').modal('show');
        //  Alterando CSS baseado no resultado da verificação
        let modalHeader = document.querySelector('.modal-header');
        modalHeader.classList.add('text-danger');

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerHTML = 'Erro na gravação';

        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = 'Existem campos obrigatórios que não foram preenchidos';

        let modalFooterBtn = document.querySelector('#modalFooterBtn');
        modalFooterBtn.innerHTML = 'Voltar e corrigir';
        modalFooterBtn.classList.add('btn-danger');
    }
}