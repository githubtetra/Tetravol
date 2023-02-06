<?php 
    require_once "libs/dbauth.php"; 
    include_once "utils/config.php";

    session_start();
	if (!isset($_SESSION['username'])) {
		header("Location: login.php");
		session_destroy();
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>CCITUB | Admin</title>
		<?php include_once("utils/head.php") ?>
	</head>

  	<body>
		<div id="db-wrapper">
			<?php include_once("utils/navs/navbar-v.php") ?>
			<div id="page-content">
				<div class="header @@classList">
					<?php include_once("utils/navs/navbar-h.php") ?>
				</div>
                <div class="bg-primary pt-10 pb-21"></div>
				<div class="container-fluid mt-n22 px-6">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-12 mb-9">
							<div class="d-flex justify-content-between align-items-center">
								<div class="mb-2 mb-lg-0">
									<h2 class="mb-0 fw-bold text-gray-300">Gestion de cuentas</h2>
								</div>
							</div>
						</div>
                        <div>
                            <div class="card mb-6 bg-dark">
								<div class="card-body">
									<a href="#" id='crearCuentaStaff' class="btn btn-dark-success text-white mx-1">Crear cuenta</a> 
								</div>
							</div>
                            <div class="card bg-dark">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table table-dark table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Password</th>
                                                    <th scope="col">Rol</th>
                                                    <th scope="col">Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php 
                                                    $accounts = MySql_Select("SELECT * FROM `panel_users`");  

                                                    while ($row = mysqli_fetch_array($accounts)) { 
                                                        echo '<tr>'; 
                                                        echo '<td>'.$row["username"].'</td>'; 
                                                        echo '<td>'.$row["psswd"].'</td>';  
                                                        echo '<td>'.$row["rol"].'</td>';
                                                        echo '<td><a href="account.php?id='.$row["id"].'" class="btn btn-dark-success text-white mx-1">Editar</a></td>';
                                                        echo '</tr>';  
                                                    } 
                                                ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
						</div>
                    </div>
                </div>
            </div>
		</div>
		<?php include_once("utils/scripts.php") ?>
        <script src="assets/js/staff.js"></script>
  	</body>
</html>