from app import app, db, jsonify, request
from werkzeug.utils import secure_filename
import os
from os.path import join, dirname, realpath


UPLOAD_FOLDER='uploads/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.get('/encuestas')
def listarEncuestas():
    cursor = db.cursor(dictionary=True)
    cursor.execute('select * from encuestas')
    encuestas = cursor.fetchall()
    return jsonify(encuestas)

@app.post('/encuestas_crear')
def crearEncuesta():
	nombre=request.form['nombre']
	descripcion=request.form['descripcion']
	user_id=request.form['id_usuario']
	file=request.files['img_url']


	filename = secure_filename(file.filename)
	#file.save(os.path.join(app.root_path, "static/uploads/", filename))
	file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

	img_url='http://127.0.0.1:5000/uploads/'+filename 

	datos={'nombre':nombre, 'descripcion':descripcion, 'img_url':img_url, 'id_usuario':int(user_id)}

	cursor = db.cursor()
	cursor.execute('''INSERT INTO encuestas(nombre, descripcion, img_url, id_usuario)
	VALUE(%s, %s, %s, %s)''', (
	datos['nombre'],
	datos['descripcion'],
	datos['img_url'],
	datos['id_usuario'],
	))
	db.commit()

	return jsonify({
	"mensaje": "encuesta alamcenada correctamente"
	})