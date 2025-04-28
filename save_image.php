<?php
// filepath: c:\Users\Sammi\Documents\GDES Y4 W\Workshop\generator\PatternGeneration\save_image.php

// Get the JSON data from the request
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

<?php
// Fetch all image paths from the database
$conn = new mysqli('ftpupload.net', 'if0_38828694', 'WS4YPpTDM5ZRq', 'if0_38828694_gallery
');
$result = $conn->query("SELECT image_path FROM gallery");

echo '<div class="gallery">';
while ($row = $result->fetch_assoc()) {
    echo '<div class="image-item">';
    echo '<img src="' . $row['image_path'] . '" alt="Captured Image">';
    echo '</div>';
}
echo '</div>';
?>

<script>
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera access. Please use a modern browser like Chrome or Firefox.');
    } else {
        video = createCapture({
            video: true,
            audio: false,
        });
        video.size(640, 480);
        video.hide();
    }
</script>