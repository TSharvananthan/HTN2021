from google.api_core.client_options import ClientOptions
import googleapiclient.discovery
import os

MODEL_NAME= os.getenv("MODEL_NAME")
VERSION_NAME=os.getenv("VERSION_NAME")
REGION=os.getenv("REGION")
GCP_PROJECT=os.getenv("GCP_PROJECT")


def predict_json(project=GCP_PROJECT, region=REGION, model=MODEL_NAME, instances=[], version=VERSION_NAME):
    """Send json data to a deployed model for prediction.

    Args:
        project (str): project where the Cloud ML Engine Model is deployed.
        region (str): regional endpoint to use; set to None for ml.googleapis.com
        model (str): model name.
        instances ([Mapping[str: Any]]): Keys should be the names of Tensors
            your deployed model expects as inputs. Values should be datatypes
            convertible to Tensors, or (potentially nested) lists of datatypes
            convertible to tensors.
        version: str, version of the model to target.
    Returns:
        Mapping[str: any]: dictionary of prediction results defined by the
            model.
    """
    # Create the ML Engine service object.
    prefix = "{}-ml".format(region) if region else "ml"
    api_endpoint = "https://{}.googleapis.com".format(prefix)
    client_options = ClientOptions(api_endpoint=api_endpoint)
    service = googleapiclient.discovery.build("ml", "v1", client_options=client_options)
    name = "projects/{}/models/{}".format(project, model)

    if version is not None:
        name += "/versions/{}".format(version)

    response = (
        service.projects().predict(name=name, body={"instances": instances}).execute()
    )

    if "error" in response:
        raise RuntimeError(response["error"])

    return list(map(lambda r: r[0], response["predictions"]))
