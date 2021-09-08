from flask import Flask, jsonify, request
import mysql.connector

db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password ='password',
    database = 'registros',
    port =3306
    
)

app = Flask(__name__)

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

    cursor.execute('''INSERT INTO personal_data(Nombre,Correo Electrónico,Contraseña)
        VALUE(%s, %s, %s)''', (
        datos['Nombre'],
        datos['Correo Electrónico'],
        datos['Contraseña'],
    ))

    db.commit()
    
    return jsonify({

        "mensaje": "usuario alamcenado correctamente"
    })


@app.get('/registros')
def listaUsuarios():
    cursor = db.cursor(dictionary=True)

    cursor.execute('select * from usuario')

    registros = cursor.fetchall()

    return jsonify(registros)


@app.put('/registros/<id>')
def actualizarUsuario(id):

    datos=request.json

    cursor = db.cursor()


    cursor.execute('''UPDATE usuario set Nombre=%s, 
        Correo Electrónico=%s, Contraseña=%s where id=%s''',(
            datos['Nombre'],
            datos['	Correo Electrónico'],
            datos['	Contraseña'],
            id
        ))
    
    db.commit()

    return jsonify({

        "mensaje": "usuario alamcenado correctamente"
    })





@app.delete('/registros/<id>')
def eliminarUsuario(id):


    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    

    return jsonify({

        "mensaje": "usuario alamcenado correctamente"
    })


app.run(debug=True)