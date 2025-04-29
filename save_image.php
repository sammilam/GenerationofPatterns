<?php
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['image'])) {
    // Extract the base64-encoded image data
    $imageData = $data['image'];

    // Remove the "data:image/png;base64," part
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);

    // Decode the base64 string
    $decodedImage = base64_decode($imageData);

    // Save the image to the snapshots folder
    $filePath = 'snapshots/snapshot_' . time() . '.png';
    if (file_put_contents($filePath, $decodedImage)) {
        echo 'Image saved successfully: ' . $filePath;
    } else {
        echo 'Failed to save image.';
    }
} else {
    echo 'No image data received.';
}
?>