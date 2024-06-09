from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash,check_password_hash

app = Flask(__name__)

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Janushan-123"
app.config["MYSQL_DB"] = "userdata1"
app.config['SECRET_KEY'] = 'fheiuhfsiuhi fhueshfiuehuis'

mysql = MySQL(app)

@app.route("/signup", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        
        hashed_password = generate_password_hash(password)
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (email,password) VALUES (%s,%s)",(email,hashed_password))
        mysql.connection.commit()
        cur.close()
        
        return redirect(url_for("home"))
        
    return render_template("signup.html")

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        
        cur = mysql.connection.cursor()
        cur.execute("""SELECT password FROM users where email = %s;""",(email,))
        user = cur.fetchone()
        
        if user and check_password_hash(user[0],password):
            
            flash("login succesful", category = "success")
            return redirect(url_for("home"))
        
        else:
            flash("login credentials not recognised, please try again", category = "error")
            return redirect(url_for("login"))
            
        
    return render_template("login.html")

@app.route("/cart")
def cart():
    return render_template("cart.html")

if __name__ == "__main__":
    app.run(debug=True)

