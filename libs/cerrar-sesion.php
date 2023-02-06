<?php 
    session_start();

    $_SESSION = array();
    setcookie("TOKEN_SAVELOGIN", "");
    
    session_destroy();
    header("Location: ../login.php");
?>