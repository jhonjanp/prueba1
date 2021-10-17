from flask import Flask, jsonify, request
from flask_cors import CORS 
import mysql.connector

db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password ='password',
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
    
app.run(debug=True)