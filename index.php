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
		<title>ccitub | DashBoard</title>
		<?php include_once("utils/head.php") ?>
	</head>
	<body>
    <div id="db-wrapper">
			<?php include_once("utils/navs/navbar-v.php") ?>
			<div id="page-content">
				<div class="header @@classList">
					<?php include_once("utils/navs/navbar-h.php") ?>
				</div>
				<div class="bg-primary pt-10 pb-7">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-center">
                                    <h1 class="text-white mb-0">Bienvenido <?php echo $_SESSION['username']?></h1>
                                    <h2 class="alt text-white mt-3">Core Sustainability Lab: Operació Delta S 2150  </h2>
                                    <p class='text-white mt-3 h3'>En un futur no gaire llunyà, al 2150, s’ha donat un col·lapse planetari on s’han reduït radicalment els recursos naturals, hi ha una contaminació massiva de tots els ecosistemes i la manca d’aigua i d’aliments fa ja inevitable la subsistència del planeta i dels seus habitants.</p>
                                    <footer>
                                        <a href="#pointNclick" class="btn btn-danger mt-5 ">Descobreix més!</a>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid px-6 py-4">
					<div class="row align-items-center">
						<div class="col-xl-12 col-lg-12 col-md-12 col-12" id="pointNclick">
							<div class=" rounded-bottom">
                                <h1 class="mb-5 mt-5 text-white text-center">Benvinguts a l'any 2150</h1> 
                                <div class="text-center">
                                    <?php 
                                        $level_1 = MySql_Select("SELECT level_1 FROM levels WHERE id = '".$_SESSION['id']."' AND level_1 = '1'"); 
                                        if ($level_1) {
                                            echo '<button id="level2" class="btn"><a href="https://playcanv.as/b/0dbc2109" target="_blank"><img src="https://i.imgur.com/DqvlHWu.png" alt="2150" class="img-fluid"></a></button>';
                                        } else {
                                            echo '<button class="btn disabled" target="_blank"><img src="https://i.imgur.com/DqvlHWu.png" alt="2150" class="img-fluid"></button>';
                                        }
                                    ?>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div class="container-fluid px-6 py-4">
					<div class="row align-items-center">
						<div class="col-xl-12 col-lg-12 col-md-12 col-12" id="microscopio">
							<div class=" rounded-bottom">
                                <h1 class="mb-5 mt-5 text-white text-center">Laboratori CCITUB</h1> 
                                <div class="text-center">
                                    <?php 
                                        $level_2 = MySql_Select("SELECT level_2 FROM levels WHERE id = '".$_SESSION['id']."' AND level_2 = '1'"); 
                                        if ($level_2) {
                                            echo '<button id="level3" class="btn"><a href="https://playcanv.as/p/jNRjv0AS/" target="_blank"><img src="https://i.imgur.com/hpg3kEl.png" alt="2150" class="img-fluid"> </a></button>';
                                        } else {
                                            echo '<button class="btn disabled"><img src="https://i.imgur.com/hpg3kEl.png" alt="2150" class="img-fluid"></button>';
                                        }
                                    ?>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div class="container-fluid px-6 py-4">
					<div class="row align-items-center">
						<div class="col-xl-12 col-lg-12 col-md-12 col-12" id="naves">
							<div class=" rounded-bottom">
                                <h1 class="mb-5 mt-5 text-white text-center">Viatge al món microspcòpic</h1> 
                                <div class="text-center">
                                    <?php 
                                        $level_3 = MySql_Select("SELECT level_3 FROM levels WHERE id = '".$_SESSION['id']."' AND level_3 = '1'"); 
                                        if ($level_3) {
                                            echo '<a href="#" target="_blank"><img src="https://i.imgur.com/hpg3kEl.png" alt="2150" class="img-fluid"> </a>';
                                        } else {
                                            echo '<button class="btn disabled"><img src="https://i.imgur.com/hpg3kEl.png" alt="2150" class="img-fluid"></button>';
                                        }
                                    ?>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
			</div>
		</div>
		<?php include_once("utils/scripts.php") ?>
        <script src="assets/js/index.js"></script>
	</body>
</html>