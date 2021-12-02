from flask import Flask, jsonify, request, make_response
from flask_cors import CORS 
import mysql.connector

"""JWT dependencias"""
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity


def con_open(): 
    return  mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password ='password',
        database = 'registros',
        port = 3306,
    )


app = Flask(__name__)

app.config["JWT_SECRET_KEY"]="Dario_And_Faber_Project"
jwt=JWTManager(app)

CORS(app)


"""Login del usuario"""

@app.post('/login')
def login():
    db=con_open()

    print("Esta es la respuesta")
    print(request.json.get("user", None))

    user=request.json.get("user", None)
    if user:

        email= user["email"]
        password= user["password"]

        cursor=db.cursor(dictionary=True, buffered=True)

        cursor.execute('select * from personal_data where Correo=%s and Contraseña=%s',
        (email, password))

        usuario=cursor.fetchone()

        cursor.close()

    if not usuario:
        return make_response(jsonify({
            "message":"Datos de acceso invalidos"
        }),400)

    token=create_access_token(identity=usuario['id'])

    return make_response(jsonify({
        "token":token
    }
    ),200)

@app.route('/')
def index():
    return 'Hello world'

@app.post('/registros')
def crearpersonal_data():
    db=con_open()
    #request  => envia el cliente
    #response => lo que le voy a responder
    datos = request.json
    
    print(datos)

    cursor = db.cursor()

    cursor.execute('''INSERT INTO personal_data(Nombre, Correo, Contraseña)
        VALUE(%s, %s, %s)''', (
        datos['Nombre'],
        datos['Correo'],
        datos['Contraseña'],
    ))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({
        "mensaje": "usuario alamcenado correctamente"
    })


@app.get('/usuarios')
@jwt_required()
def listaUsuarios():
    usuario=get_jwt_identity()
    print(usuario)
    db=con_open()
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from personal_data')
    registros = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(registros)

@app.put('/usuario/<id>')
def actualizarUsuario(id):
    db=con_open()
    datos=request.json
    cursor = db.cursor()
    cursor.execute('''UPDATE personal_data set Nombre=%s, 
        Correo=%s, Contraseña=%s where id=%s''',(
            datos['Nombre'],
            datos['Correo'],
            datos['Contraseña'],
            id
        ))
    
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "usuario alamcenado correctamente"
    })  
    
@app.delete('/usuarios/<id>')
def eliminarUsuario(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('DELETE FROM personal_data where id=%s',(id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "usuario eliminado correctamente"
    })

@app.get('/usuarios/<id>')
def unUsuario(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM personal_data where id=%s',([id]))
    usuario = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(usuario)


#Encuestas

from werkzeug.utils import secure_filename
import os
from os.path import join, dirname, realpath


UPLOAD_FOLDER='static/uploads/'


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.get('/encuestas/<id>')
def getEncuesta(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM encuestas where id=%s',([id]))
    encuesta = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(encuesta)

@app.get('/encuestas')
def listarEncuestas():
    db=con_open()
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from encuestas')
    encuestas = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(encuestas)

@app.post('/encuestas')
def crearEncuesta():
    db=con_open()
    nombre=request.form['nombre']
    descripcion=request.form['descripcion']
    user_id=request.form['id_usuario']
    file=request.files['img_url']

    #datos = request.json
    #file=request.files[datos['img_url']]

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.root_path, "static/uploads/", filename))
    #file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    img_url='http://127.0.0.1:5000/static/uploads/'+filename 

    datos={'nombre':nombre, 'descripcion':descripcion, 'img_url':img_url, 'id_usuario':int(user_id)}

    cursor = db.cursor()
    cursor.execute('''INSERT INTO encuestas(nombre, descripcion, img_url, id_usuario)
    VALUE(%s, %s, %s, %s)''', (
    datos['nombre'],
    datos['descripcion'],
    img_url,
    datos['id_usuario'],
    ))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({
    "mensaje": "encuesta alamcenada correctamente"
    })

@app.put('/encuesta/<id>')
def actualizarEncuesta(id):
    db=con_open()
    nombre=request.form['nombre']
    descripcion=request.form['descripcion']
    user_id=request.form['id_usuario']
    
    if(request.files.get('img_url')!=None):
        file=request.files['img_url']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.root_path, "static/uploads/", filename))

        img_url='http://127.0.0.1:5000/static/uploads/'+filename 
        datos={'nombre':nombre, 'descripcion':descripcion, 'img_url':img_url, 'id_usuario':int(user_id)}

        cursor = db.cursor()
        cursor.execute('''UPDATE encuestas set nombre=%s, 
        descripcion=%s, img_url=%s, id_usuario=%s where id=%s''',(
            datos['nombre'],
            datos['descripcion'],
            datos['img_url'],
            datos['id_usuario'],
            id
        ))
        db.commit()
        cursor.close()
        db.close()
    else:
        print("here")
        print(nombre)
        print(descripcion)
        print(user_id)
        datos={'nombre':nombre, 'descripcion':descripcion, 'id_usuario':int(user_id)}
        cursor = db.cursor()
        cursor.execute('''UPDATE encuestas set nombre=%s, 
            descripcion=%s, id_usuario=%s where id=%s''',(
                datos['nombre'],
                datos['descripcion'],
                datos['id_usuario'],
                id
            ))
        db.commit()
        cursor.close()
        db.close()

    return jsonify({
        "mensaje": "encuesta actualizada correctamente"
    })  

@app.delete('/encuesta/<id>')
def eliminarEncuesta(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('DELETE FROM encuestas where id=%s',(id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({
        "mensaje": "encuesta eliminada correctamente"
    })
#Tipos de preguntas
@app.get('/tipo_preguntas')
def listarTipoPreguntas():
    db=con_open()
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from tipo_pregunta')
    encuestas = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(encuestas)

# Secciones
@app.post('/secciones')
def crearSeccion():
    db=con_open()
    datos = request.json
    print(datos)
    cursor = db.cursor()
    cursor.execute('''INSERT INTO secciones(nombre, id_encuesta)
        VALUE(%s, %s)''', (
        datos['nombre'],
        datos['id_encuesta'],
    ))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({
        "mensaje": "Seccion alamcenada correctamente"
    })


@app.get('/secciones')
def listaSecciones():
    db=con_open()
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from secciones')
    registros = cursor.fetchall()
    cursor.close() 
    db.close()
    return jsonify(registros)

@app.get('/secciones/<id>')
def getSeccion(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM secciones where id=%s',([id]))
    encuesta = cursor.fetchall()
    cursor.close() 
    db.close()
    return jsonify(encuesta)

@app.put('/secciones/<id>')
def actualizarSeccion(id):
    db=con_open()
    datos=request.json
    cursor = db.cursor()
    cursor.execute('''UPDATE secciones set nombre=%s, 
        id_encuesta=%s where id=%s''',(
            datos['nombre'],
            datos['id_encuesta'],
            id
        ))
    
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "seccion actualizada correctamente"
    })  
    
@app.delete('/secciones/<id>')
def eliminarSeccion(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('DELETE FROM secciones where id=%s',(id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "seccion eliminada correctamente"
    })

#preguntas

@app.post('/preguntas')
def crearPregunta():
    db=con_open()
    datos = request.json
    print(datos)
    cursor = db.cursor()

    cursor.execute('''INSERT INTO preguntas (pregunta, id_tipo_pregunta, id_seccion)
        VALUE(%s, %s, %s)''', (
        datos['pregunta'],
        datos['id_tipo_pregunta'],
        datos['id_seccion'],
    ))
    db.commit()
    cursor.close() 
    db.close() 
    return jsonify({
        "mensaje": "Pregunta alamcenada correctamente"
    })


@app.get('/preguntas')
def listaPreguntas():
    db=con_open()
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from preguntas')
    registros = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(registros)

@app.put('/preguntas/<id>')
def actualizarPreguntas(id):
    db=con_open()
    datos=request.json
    cursor = db.cursor()
    cursor.execute('''UPDATE preguntas set pregunta=%s, 
        id_tipo_pregunta=%s, id_seccion=%s where id=%s''',(
            datos['pregunta'],
            datos['id_tipo_pregunta'],
            datos['id_seccion'],
            id
        ))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "pregunta actualizada correctamente"
    })  
    
@app.delete('/preguntas/<id>')
def eliminarPregunta(id):
    db=con_open()
    cursor = db.cursor()
    cursor.execute('DELETE FROM preguntas where id=%s',(id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({

        "mensaje": "preguntas eliminada correctamente"
    })

app.run(debug=True)
