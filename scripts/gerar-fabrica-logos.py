"""Gera scripts/fabrica-logos.js com os logos da Fábrica de Artes embutidos em base64.

Por que embutir: abrindo fabrica-artes.html direto do computador (file://), o Chrome trata
imagens da pasta como de outra origem e bloqueia o download do PNG ("tainted canvas").

Chaves geradas:  <logo>_<fundo>[_mono]
  logo  = umad | djad | 80
  fundo = escuro (arte de fundo preto) | claro (arte de fundo branco)
  _mono = versão de uma cor só (branca no fundo escuro, preta no claro)

Originais enviados pela equipe ficam em images/logos/. As cópias usadas aqui (cortadas nas
bordas, com nomes simples) ficam em images/djad/ e images/umadcamp/.

Uso (na raiz do projeto):  python scripts/gerar-fabrica-logos.py
"""
import base64
import io
import os

from PIL import Image

ALTURA = 360  # o cabeçalho da arte mostra o logo com ~124px de altura; 360 dá folga de nitidez
ESCURO = (22, 20, 18)


def load(path):
    im = Image.open(path).convert('RGBA')
    bb = im.getchannel('A').point(lambda v: 255 if v > 16 else 0).getbbox()
    im = im.crop(bb)
    if im.height > ALTURA:
        im = im.resize((round(im.width * ALTURA / im.height), ALTURA), Image.LANCZOS)
    return im


def pintar(im, cor):
    """Pinta todos os pixels visíveis de uma cor só (mantém a transparência)."""
    return Image.merge('RGBA', (*Image.new('RGB', im.size, cor).split(), im.getchannel('A')))


def enc(im):
    buf = io.BytesIO()
    im.save(buf, 'PNG', optimize=True)
    return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()


umad_branco = load('images/umadcamp/umadcamp-branco.png')
umad_preto = pintar(umad_branco, ESCURO)
umad_preto.save('images/umadcamp/umadcamp-preto.png', optimize=True)  # deixa a versão preta salva para outros usos

oitenta_branco = load('images/80anos/logo-80-branca.png')

logos = {
    'umad_escuro': umad_branco,
    'umad_claro': umad_preto,
    'djad_escuro': load('images/djad/djad-fundo-escuro.png'),
    'djad_claro': load('images/djad/djad-fundo-claro.png'),
    'djad_escuro_mono': load('images/djad/djad-branco.png'),
    'djad_claro_mono': load('images/djad/djad-preto.png'),
    '80_escuro': oitenta_branco,
    '80_claro': load('images/80anos/logo-80.png'),
    '80_escuro_mono': pintar(oitenta_branco, (255, 255, 255)),
    '80_claro_mono': pintar(oitenta_branco, ESCURO),
}

out = 'scripts/fabrica-logos.js'
with open(out, 'w', encoding='utf-8') as f:
    f.write('// GERADO por scripts/gerar-fabrica-logos.py — não edite à mão; rode o script de novo ao trocar um logo.\n')
    f.write('// Logos embutidos para o download funcionar mesmo abrindo o HTML direto do computador (file://).\n')
    f.write('window.FABRICA_LOGOS = {\n' + ',\n'.join(f"    '{k}': '{enc(v)}'" for k, v in logos.items()) + '\n};\n')
for k, v in logos.items():
    print(f'{k:18} {v.size}')
print(out, os.path.getsize(out), 'bytes')
