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
		<title>ImperioRP | Admin</title>
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
									<h2 class="mb-0 fw-bold text-gray-300">Pito</h2>
								</div>
							</div>
						</div>
                        <div>
                            <div class="card mb-6 bg-dark">
								<div class="card-body">
									<a href="#" id='crearCuentaStaff' class="btn btn-dark-success text-white mx-1">Agregar Vehículo</a> 
								</div>
							</div>
                            <div class="card bg-dark">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table table-dark table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Modelo</th>
                                                    <th scope="col">Precio</th>
                                                    <th scope="col">Categoria</th>
                                                    <th scope="col">Visible</th>
                                                </tr>
                                            </thead>
                                            <!-- <tbody>
                                                <?php 
                                                    // $vehiculos = MySql_Select($sql_consulta);  

                                                    // while ($row = mysqli_fetch_array($vehiculos)) { 
                                                    //     echo '<tr>'; 
                                                    //     echo '<td>'.$row["nombre"].'</td>'; 
                                                    //     echo '<td>'.$row["modelo"].'</td>';  
                                                    //     echo '<td><span class="badge bg-dark-success">'.number_format($row["precio"]).'$</span></td>'; 
                                                    //     echo '<td>'.$row["categoria"].'</td>'; 
                                                    //     echo '<td>'.$row["visible"].'</td>'; 
                                                    //     echo '</tr>';  
                                                    // } 
                                                ?>
                                            </tbody> -->
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