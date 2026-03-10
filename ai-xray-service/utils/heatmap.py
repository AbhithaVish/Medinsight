import tensorflow as tf
import numpy as np
import cv2
import base64


def generate_gradcam(model, image_array, layer_name="conv5_block3_out"):

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:

        conv_outputs, predictions = grad_model(image_array)

        # Handle models that return list output
        if isinstance(predictions, list):
            predictions = predictions[0]

        class_channel = predictions[:, 0]

    grads = tape.gradient(class_channel, conv_outputs)

    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]

    heatmap = tf.reduce_sum(conv_outputs * pooled_grads, axis=-1)

    heatmap = np.maximum(heatmap, 0)

    heatmap /= np.max(heatmap) + 1e-8

    return heatmap


def overlay_heatmap(original_image, heatmap):

    heatmap = cv2.resize(heatmap, (224, 224))
    heatmap = np.uint8(255 * heatmap)

    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    original_image = original_image.astype("uint8")

    superimposed = cv2.addWeighted(original_image, 0.6, heatmap, 0.4, 0)

    _, buffer = cv2.imencode(".jpg", superimposed)

    img_base64 = base64.b64encode(buffer).decode("utf-8")

    return img_base64