#!/usr/bin/env node

/**
 * Script para importar dados do CSV para o Firebase
 * 
 * Pré-requisitos:
 * npm install firebase csv-parser
 * 
 * Uso:
 * node import-csv.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('csv-parser');

// Configuração do Firebase Admin SDK
// IMPORTANTE: Baixe o arquivo de chave de serviço do Firebase Console
const serviceAccount = require('./serviceAccountKey.json'); // Substitua pelo seu arquivo

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'umadcamp-patu' // Substitua pelo seu project ID
});

const db = admin.firestore();

// Dados do CSV (hardcoded)
const csvData = [
    { nome: 'Abinoã Praxedes Forte', data_nascimento: '28/06/2002', cidade: 'Patu' },
    { nome: 'Alerrandra Rodrigues da Silva', data_nascimento: '05/10/2011', cidade: 'Patu' },
    { nome: 'Alessandro Adrian', data_nascimento: '10/02/2007', cidade: 'Patu' },
    { nome: 'Amanda Ingrid Lima Nunes', data_nascimento: '13/08/1997', cidade: 'Patu' },
    { nome: 'Ana Júlia Paiva Dantas', data_nascimento: '07/06/2011', cidade: 'Patu' },
    { nome: 'Clara Crislayne Ferreira Dantas Santos', data_nascimento: '08/02/1999', cidade: 'Patu' },
    { nome: 'Daniel Adrian de Oliveira Godeiro', data_nascimento: '06/02/2009', cidade: 'Patu' },
    { nome: 'Daniel de Souza Santos', data_nascimento: '16/06/2007', cidade: 'Patu' },
    { nome: 'Daniel Ferreira do Nascimento', data_nascimento: '05/09/1998', cidade: 'Patu' },
    { nome: 'Daniel Vinicius Faustino de Lima', data_nascimento: '01/06/1996', cidade: 'Patu' },
    { nome: 'Danilo Silva Ventura de Almeida', data_nascimento: '25/03/2009', cidade: 'Patu' },
    { nome: 'Davi De Sousa Santos', data_nascimento: '16/06/2007', cidade: 'Patu' },
    { nome: 'Elany Rayris Ferreira da Silva', data_nascimento: '10/10/2001', cidade: 'Patu' },
    { nome: 'Elias Felix de oliveira', data_nascimento: '25/04/2006', cidade: 'Patu' },
    { nome: 'Eliedson Firmino da Silva', data_nascimento: '12/06/1989', cidade: 'Patu' },
    { nome: 'Emanuel Ferreira do Nascimento', data_nascimento: '10/12/2005', cidade: 'Patu' },
    { nome: 'Emmanuel Ferreira do Nascimento', data_nascimento: '10/12/2005', cidade: 'Patu' },
    { nome: 'Evericia Azevedo da Silva', data_nascimento: '14/03/2002', cidade: 'Patu' },
    { nome: 'Ewerton Felipe Melo Lopes', data_nascimento: '25/04/1999', cidade: 'Patu' },
    { nome: 'Francisca Rita Pereira Dantas ( Ritinha)', data_nascimento: '11/10/2009', cidade: 'Patu' },
    { nome: 'Gilton Simão de Souza', data_nascimento: '05/05/2008', cidade: 'Patu' },
    { nome: 'Isadora dantas de Oliveira', data_nascimento: '13/10/2005', cidade: 'Patu' },
    { nome: 'Ivanildo Ferreira Junior', data_nascimento: '02/04/1995', cidade: 'Patu' },
    { nome: 'Jacira Alves Ferreira', data_nascimento: '14/02/1960', cidade: 'Patu' },
    { nome: 'Joabe Esly Dantas de Oliveira', data_nascimento: '01/05/1995', cidade: 'Patu' },
    { nome: 'João Batista Alves Monteiro', data_nascimento: '16/05/1984', cidade: 'Patu' },
    { nome: 'João Judson Alves Maia', data_nascimento: '25/04/2000', cidade: 'Patu' },
    { nome: 'Jonas Vieira da Silva', data_nascimento: '13/10/1995', cidade: 'Patu' },
    { nome: 'Jonnas Azevedo da Silva', data_nascimento: '30/11/1999', cidade: 'Patu' },
    { nome: 'Joseane Paiva Dantas', data_nascimento: '27/12/2008', cidade: 'Patu' },
    { nome: 'Joyce Keyllha Alves de Moura', data_nascimento: '16/02/2004', cidade: 'Patu' },
    { nome: 'Júlia Amaral Belo Soares Solano', data_nascimento: '26/01/2011', cidade: 'Patu' },
    { nome: 'Kauê Rodrigues de Oliveira', data_nascimento: '09/09/2005', cidade: 'Patu' },
    { nome: 'Kevyn Alves de Moura', data_nascimento: '14/07/2010', cidade: 'Patu' },
    { nome: 'Larissa Raianni Macena da Silva', data_nascimento: '12/07/2005', cidade: 'Patu' },
    { nome: 'Layla Raissa Belo de Oliveira', data_nascimento: '06/07/1999', cidade: 'Patu' },
    { nome: 'Laylize da Silva Maia', data_nascimento: '06/07/1999', cidade: 'Patu' },
    { nome: 'Maria Clarice Mendes da Silva', data_nascimento: '24/09/1983', cidade: 'Patu' },
    { nome: 'Maria Isabelly Soares de Melo', data_nascimento: '27/08/2008', cidade: 'Patu' },
    { nome: 'Maria kawany Pereira do Nascimento', data_nascimento: '20/02/2006', cidade: 'Patu' },
    { nome: 'Maria shemilla Azevedo Feitosa', data_nascimento: '27/08/2010', cidade: 'Patu' },
    { nome: 'Micael Campos Belo dos Santos', data_nascimento: '07/12/2002', cidade: 'Patu' },
    { nome: 'Miriã Quézia Oliveira Gomes', data_nascimento: '14/03/2004', cidade: 'Patu' },
    { nome: 'Moisés Emanuel Oliveira Gomes', data_nascimento: '09/12/2006', cidade: 'Patu' },
    { nome: 'Natália Kelly Dantas Oliveira', data_nascimento: '30/06/2004', cidade: 'Patu' },
    { nome: 'Nicolas Daniel Ernesto Leite', data_nascimento: '13/07/2009', cidade: 'Patu' },
    { nome: 'Nikolas Cortez Alves', data_nascimento: '25/04/2011', cidade: 'Patu' },
    { nome: 'Olga Letícia da Silva Gurgel', data_nascimento: '26/06/2006', cidade: 'Patu' },
    { nome: 'Onã Victor da Silva Gurgel', data_nascimento: '14/05/1999', cidade: 'Patu' },
    { nome: 'Pedro asafe de lima soares', data_nascimento: '05/12/2009', cidade: 'Patu' },
    { nome: 'Raí soares de oliveira', data_nascimento: '23/01/2008', cidade: 'Patu' },
    { nome: 'Raissa da Silva Braz', data_nascimento: '01/11/2006', cidade: 'Patu' },
    { nome: 'Ravel Soares de Oliveira', data_nascimento: '01/06/2005', cidade: 'Patu' },
    { nome: 'Rayssa da Silva Braz', data_nascimento: '02/08/2025', cidade: 'Patu' },
    { nome: 'Ridemilly Vitória Alves dos Santos', data_nascimento: '06/01/2007', cidade: 'Patu' },
    { nome: 'Sâmela Ryane Alves Cavalcante Nunes', data_nascimento: '11/10/2006', cidade: 'Patu' },
    { nome: 'Sara Alves Cândido', data_nascimento: '07/08/1996', cidade: 'Patu' },
    { nome: 'Simone Bezerra Nascimento', data_nascimento: '23/09/1998', cidade: 'Patu' },
    { nome: 'Suzana Alves Cândido', data_nascimento: '19/06/1998', cidade: 'Patu' },
    { nome: 'Syllas Alves Leite', data_nascimento: '22/04/2005', cidade: 'Patu' },
    { nome: 'Thallysom Alexandre de Almeida Alves', data_nascimento: '11/04/2002', cidade: 'Patu' },
    { nome: 'Thayanne Sthefanny de Almeida Alves', data_nascimento: '27/04/2025', cidade: 'Patu' },
    { nome: 'Thiago Raniery Alves Linhares', data_nascimento: '09/03/2002', cidade: 'Patu' },
    { nome: 'Tiago Dantas Oliveira', data_nascimento: '25/04/2001', cidade: 'Patu' },
    { nome: 'Vinícius Costa Araújo Lira', data_nascimento: '13/05/1997', cidade: 'Patu' },
    { nome: 'Vitoria Beatriz Alves Emídio', data_nascimento: '19/12/2010', cidade: 'Patu' },
    { nome: 'Wesley Belo de Azevedo', data_nascimento: '16/08/2004', cidade: 'Patu' }
];

const agendaData = [
    { mes: 'SETEMBRO', dataInicio: '2024-09-20', dataFim: null, titulo: 'Congresso Unificado', local: 'João Dias' },
    { mes: 'SETEMBRO', dataInicio: '2024-09-24', dataFim: '2024-09-27', titulo: 'Congresso de Jovens', local: 'Lucrécia' },
    { mes: 'OUTUBRO', dataInicio: '2024-10-17', dataFim: '2024-10-19', titulo: 'Congresso de Jovens', local: 'Candeia' },
    { mes: 'OUTUBRO', dataInicio: '2024-10-18', dataFim: null, titulo: 'Congresso de Jovens', local: 'Almino Afonso' },
    { mes: 'OUTUBRO', dataInicio: '2024-10-31', dataFim: null, titulo: 'Congresso de Jovens', local: 'Pintada' },
    { mes: 'NOVEMBRO', dataInicio: '2024-11-01', dataFim: null, titulo: 'Congresso de Jovens', local: 'Pintada' },
    { mes: 'NOVEMBRO', dataInicio: '2024-11-15', dataFim: null, titulo: 'Aniversário do Conjunto e do círculo de oração da mocidade', local: 'Pico Branco' },
    { mes: 'NOVEMBRO', dataInicio: '2024-11-22', dataFim: null, titulo: 'Dejad na Estrada', local: 'Patu' },
];

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function formatarDataBR(dataStr) {
    // Converte de DD/MM/YYYY para YYYY-MM-DD
    const [dia, mes, ano] = dataStr.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

async function obterProximoNumero() {
    const snapshot = await db.collection('membros').get();
    let proximoNumero = 1;

    if (snapshot.size > 0) {
        const numeros = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.numero) {
                numeros.push(data.numero);
            }
        });
        if (numeros.length > 0) {
            proximoNumero = Math.max(...numeros) + 1;
        }
    }

    return proximoNumero;
}

async function importarDados() {
    console.log('🚀 Iniciando importação dos dados...');

    try {
        const proximoNumero = await obterProximoNumero();
        console.log(`📊 Próximo número: ${proximoNumero}`);

        let sucessos = 0;
        let erros = 0;
        let numeroAtual = proximoNumero;

        for (let i = 0; i < csvData.length; i++) {
            const row = csvData[i];

            try {
                const dataNascimento = formatarDataBR(row.data_nascimento);
                const membro = {
                    numero: numeroAtual++,
                    nome: row.nome,
                    dataNascimento: dataNascimento,
                    cidade: row.cidade,
                    idade: calcularIdade(dataNascimento),
                    dataCadastro: admin.firestore.FieldValue.serverTimestamp()
                };

                await db.collection('membros').add(membro);
                sucessos++;

                console.log(`✅ ${i + 1}/${csvData.length} - ${row.nome} (${row.cidade})`);

            } catch (error) {
                console.error(`❌ Erro ao importar ${row.nome}:`, error.message);
                erros++;
            }
        }

        console.log('\n🎉 Importação concluída!');
        console.log(`✅ Sucessos: ${sucessos}`);
        console.log(`❌ Erros: ${erros}`);
        console.log(`📊 Total processado: ${csvData.length}`);

    } catch (error) {
        console.error('💥 Erro durante a importação:', error);
    }
}

async function importarAgenda() {
    console.log('📅 Iniciando importação da agenda...');
    const collectionRef = db.collection('agenda');
    let sucessos = 0;
    let erros = 0;

    for (const evento of agendaData) {
        try {
            const doc = {
                ...evento,
                dataCadastro: admin.firestore.FieldValue.serverTimestamp()
            };
            await collectionRef.add(doc);
            sucessos++;
            console.log(`✅ Evento adicionado: ${evento.titulo} em ${evento.local}`);
        } catch (error) {
            erros++;
            console.error(`❌ Erro ao adicionar evento ${evento.titulo}:`, error.message);
        }
    }

    console.log('\n🎉 Importação da agenda concluída!');
    console.log(`✅ Sucessos: ${sucessos}`);
    console.log(`❌ Erros: ${erros}`);
}

async function limparAgenda() {
    console.log('🗑️ Limpando coleção da agenda...');
    try {
        const snapshot = await db.collection('agenda').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`✅ Agenda limpa: ${snapshot.size} eventos removidos.`);
    } catch (error) {
        console.error('💥 Erro ao limpar agenda:', error);
    }
}

async function limparBanco() {
    console.log('🗑️ Limpando banco de dados...');

    try {
        const snapshot = await db.collection('membros').get();
        const batch = db.batch();

        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log(`✅ Banco limpo: ${snapshot.size} membros removidos`);

    } catch (error) {
        console.error('💥 Erro ao limpar banco:', error);
    }
}

async function mostrarEstatisticas() {
    try {
        const snapshot = await db.collection('membros').get();
        console.log(`📊 Total de membros no banco: ${snapshot.size}`);

        if (snapshot.size > 0) {
            const cidades = {};
            snapshot.forEach(doc => {
                const data = doc.data();
                const cidade = data.cidade || 'Não informado';
                cidades[cidade] = (cidades[cidade] || 0) + 1;
            });

            console.log('\n🏙️ Membros por cidade:');
            Object.entries(cidades).forEach(([cidade, count]) => {
                console.log(`  ${cidade}: ${count} membros`);
            });
        }

    } catch (error) {
        console.error('💥 Erro ao obter estatísticas:', error);
    }
}

// Função principal
async function main() {
    const args = process.argv.slice(2);
    const comando = args[0];

    switch (comando) {
        case 'import':
            await importarDados();
            break;
        case 'clear':
            await limparBanco();
            break;
        case 'stats':
            await mostrarEstatisticas();
            break;
        case 'import-agenda':
            await importarAgenda();
            break;
        case 'clear-agenda':
            await limparAgenda();
            break;
        default:
            console.log('📋 Comandos disponíveis:');
            console.log('  node import-csv.js import         - Importar dados de membros do CSV');
            console.log('  node import-csv.js clear          - Limpar coleção de membros');
            console.log('  node import-csv.js stats          - Mostrar estatísticas de membros');
            console.log('  node import-csv.js import-agenda  - Importar dados da agenda');
            console.log('  node import-csv.js clear-agenda   - Limpar coleção da agenda');
            break;
    }

    process.exit(0);
}

// Executar
main().catch(console.error);
