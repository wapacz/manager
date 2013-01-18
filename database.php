<?php 

$conn = new MongoClient();
$collection = $conn->manager->tasks;

$cursor = $collection->find(); //array("_id"=> new MongoId("50c9ccb1e0d4464c083cd3de")));
print json_encode(iterator_to_array($cursor));

//print json_encode($collection->findOne());

?>