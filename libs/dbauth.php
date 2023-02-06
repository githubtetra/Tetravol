<?php
    // Credentials
    $servername = "localhost";
    $database = "test";
    $username = "root";
    $password = "";

    // $servername = "db5011398959.hosting-data.io";
    // $database = "dbs9617458";
    // $username = "dbu465204";
    // $password = "asdfghjklkuytrdfg";
    
    // Connect
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) die("Connection failed: ".mysqli_connect_error());

    // Query
    function MySql_Select($sql) {
        global $conn;
        $result = mysqli_query($conn, $sql);
        if (!empty($result) AND !mysqli_num_rows($result) > 0) return "0";
        return $result;
    };

    // query update
    function MySql_Update($sql) {
        global $conn;
        if (!$conn -> query($sql)) return strval($conn->error);
    };

    // Execute
    function MySql_Execute($sql) {
        global $conn;
        if (!$conn -> query($sql)) return strval($conn->error);
    };
?>