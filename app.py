from flask import Flask, jsonify, request
from flask_cors import CORS 
import mysql.connector

db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password ='',
    database = 'registros',
    port = 3306,
    
)

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Hello world'

@app.post('/registros')
def crearpersonal_data():
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
    
    return jsonify({
        "mensaje": "usuario alamcenado correctamente"
    })


@app.get('/usuarios')
def listaUsuarios():
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from personal_data')
    registros = cursor.fetchall()
    return jsonify(registros)

@app.put('/usuario/<id>')
def actualizarUsuario(id):
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

    return jsonify({

        "mensaje": "usuario alamcenado correctamente"
    })  
    
@app.delete('/usuarios/<id>')
def eliminarUsuario(id):
    cursor = db.cursor()
    cursor.execute('DELETE FROM personal_data where id=%s',(id,))
    db.commit()
    return jsonify({

        "mensaje": "usuario eliminado correctamente"
    })

@app.get('/Usuarios/<id>')
def unUsuario(id):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM personal_data where id=%s',([id]))
    usuario = cursor.fetchall()
    return jsonify(usuario)

#Encuestas

from werkzeug.utils import secure_filename
import os
from os.path import join, dirname, realpath


UPLOAD_FOLDER='static/uploads/'


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.get('/encuestas')
def listarEncuestas():
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from encuestas')
    encuestas = cursor.fetchall()
    return jsonify(encuestas)

@app.post('/encuestas')
def crearEncuesta():
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

    return jsonify({
    "mensaje": "encuesta alamcenada correctamente"
    })

@app.put('/encuesta/<id>')
def actualizarEncuesta(id):
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

    return jsonify({

        "mensaje": "encuesta actualizada correctamente"
    })  

@app.delete('/encuesta/<id>')
def eliminarEncuesta(id):
    cursor = db.cursor()
    cursor.execute('DELETE FROM encuestas where id=%s',(id,))
    db.commit()
    return jsonify({
        "mensaje": "encuesta eliminada correctamente"
    })


app.run(debug=True)