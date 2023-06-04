import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ServiceStack } from "./service-stack";
import { ApiGatewayStack } from "./api_gateway-stack";
import { S3BucketStack } from "./s3bucket-stack";

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { bucket } = new S3BucketStack(this, "productsImages");

    const {
      productService,
      categoryService,
      dealsService,
      imageService,
      queueService,
    } = new ServiceStack(this, "ProductService", {
      bucket: bucket.bucketName,
    });

    bucket.grantReadWrite(imageService);

    new ApiGatewayStack(this, "ProductApiGayeway", {
      productService,
      categoryService,
      dealsService,
      imageService,
      queueService,
    });
  }
}
