import { View } from "@dlightjs/dlight"

@View
class Image {
  Body() {
    div("Beautiful Scenery!")
    img()
      .src("https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/wyoming-scenery-wallpaper-2.jpg")
      .width(500)
  }
}

export default Image
