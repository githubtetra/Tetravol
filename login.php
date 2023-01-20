<?php 
    session_start();
    require_once "libs/dbauth.php"; 
	include_once "utils/config.php";
	
	$bloquearCampos = false;
	$ip = $_SERVER["REMOTE_ADDR"];
	
	
	if (isset($_GET["redirect"])) $GETRedirect = $_GET["redirect"];
	if (isset($_POST["redirect"]) && $_POST["redirect"] != "") $POSTRedirect = $_POST["redirect"];

	if (isset($_SESSION['email'])) header("Location: index.php");
	
    if (isset($_COOKIE['TOKEN_SAVELOGIN'])) {
        $cookieToken = $_COOKIE['TOKEN_SAVELOGIN'];
        $consultaSql = MySql_Select("SELECT * FROM panel_users WHERE token = '$cookieToken'");

        if ($consultaSql) {
            $row = mysqli_fetch_array($consultaSql);
            if ($row["token"] == $cookieToken) { 
				setSession($row, $CONFIG_ROLS_STRINGS, $CONFIG_ROLS_EXTRA_STRINGS);
				setcookie("TOKEN_SAVELOGIN", $row["token"], time() + 43200000);
				if (isset($POSTRedirect)) { header("Location: ".$POSTRedirect); } 
				else { header("Location: index.php"); }
            }
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!empty($_POST['accion'] && $_POST['accion'] === "login")) {
            if (!empty($_POST['psswd'] || !empty($_POST['username']))) {

                $password = $_POST['psswd'];
                $username = $_POST['username'];
                $consultaSql = MySql_Select("SELECT * FROM panel_users WHERE username = '$username' AND psswd = '$password'");

				if (!$bloquearCampos) {
					$bloquearCampos = false;
					if ($consultaSql) {
						$row = mysqli_fetch_array($consultaSql);
						if ($row["username"] == $username || $row["psswd"] == $password) { 
							if (isset($_POST['saveLogin'])) { saveToken($username); };
							setSession($row, $CONFIG_ROLS_STRINGS,);
							if (isset($POSTRedirect)) { header("Location: ".$POSTRedirect); } 
							else { header("Location: index.php"); }
						} else { 
							$alertaerror = "Credenciales incorrectas"; 
						}
					} else { 
						$alertaerror = "Credenciales incorrectas"; 
					}
				}
            } else { $alertaerror = "Todos los campos son obligatorios"; }
        }
    }

	function saveToken($username) {
		$token = generarToken();
		setcookie("TOKEN_SAVELOGIN", $token, time() + 43200000);
		MySql_Execute("UPDATE panel_users SET token = '$token' WHERE username = '$username';"); 
	}

	function setSession($row, $CONFIG_ROLS_STRINGS) {
		$_SESSION['username'] = $row["username"];
		$_SESSION['password'] = $row["password"];
		$_SESSION['id'] = $row["id"];
		$_SESSION['token'] = $row["token"];

		$_SESSION['rol'] = $row["rol"];
		$_SESSION['rol_label'] = $CONFIG_ROLS_STRINGS[$row["rol"]];

		if ($row["rol"] == "admin") {
			$_SESSION['admin'] = true;
		} else {
			$_SESSION['admin'] = false;
		};

		// verificamos si el usuario tiene un nivel asignado si no lo tiene se le asigna uno
		$consultaSql = MySql_Select("SELECT * FROM levels WHERE id = '".$row["id"]."'");
		if (!$consultaSql) {
			$consultaSql = MySql_Execute("INSERT INTO levels (id) VALUES ('".$row["id"]."')");
		}
	}

    function generarToken() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $tokenGenerada = '';

        for ($i = 0; $i < 50; $i++) {
            $tokenGenerada .= $characters[rand(0, $charactersLength - 1)];
        }	

        return $tokenGenerada;
    }
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- <meta http-equiv='refresh' CONTENT='10'> -->
		<title>ccitub | Login</title>
		<?php include_once("utils/head.php") ?>
	</head>
	<body>
    <div class="card mb-6">
		<div class="container d-flex flex-column">
			<div class="row align-items-center justify-content-center g-0 min-vh-100">
				<div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
					<div class="card smooth-shadow-md">
						<div class="card-body p-6 bg-dark">
							<div class="mb-4">
                                <p class="mb-1 h3 text-center text-white fw-bold">Iniciar sesión</p>
							</div>

							<form action="login.php" method="POST">
								<input type="hidden" name="accion" value="login">
								<input type="hidden" name="redirect" value="<?php if (isset($GETRedirect)) echo $GETRedirect; ?>">

								<div class="mb-3">
									<label for="username" class="form-label text-white">Nombre de usuario</label>
									<?php 
										if (isset($bloquearCampos) && !$bloquearCampos) {
											echo '<input type="text" id="username" class="form-control" name="username" placeholder="Manolo" required="">';
										} else {
											echo '<input type="text" id="username" class="form-control" name="username" placeholder="Manolo" required="" disabled>';
										}
									?>
									
									
								</div>
								
								<div class="mb-3">
									<label for="psswd" class="form-label text-white">Contraseña</label>
									<?php 
										if (isset($bloquearCampos) && !$bloquearCampos) {
											echo '<input type="password" id="psswd" class="form-control" name="psswd" placeholder="**************" required="">';
										} else {
											echo '<input type="password" id="psswd" class="form-control" name="psswd" placeholder="**************" required="" disabled>';
										}
									?>
								</div>

								<!-- <div class="d-lg-flex justify-content-between align-items-center mb-4">
									<div class="form-check custom-checkbox">
										<label class="form-check-label text-white" for="saveLogin">Recuerdame</label>
										<?php 
											// if (isset($bloquearCampos) && !$bloquearCampos) {
											// 	echo '<input name="saveLogin" type="checkbox" class="form-check-input" id="saveLogin">';
											// } else {
											// 	echo '<input name="saveLogin" type="checkbox" class="form-check-input" id="saveLogin" disabled>';
											// }
										?>
									</div>
								</div> -->

								<div>
									<div class="mb-3 d-grid mt-3">
										<?php 
											if (isset($bloquearCampos) && !$bloquearCampos) {
												echo '<button type="submit" class="btn btn-primary">Login</button>';
											} else {
												echo '<button type="submit" class="btn btn-primary" disabled>Login</button>';
											}
										?>
									</div>
								</div>

								<?php if (!empty($alertaerror)) { echo '<div class="alert alert-danger" role="alert">'.$alertaerror.'</div>'; } ?>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php include_once("utils/scripts.php") ?>
	</body>
</html>