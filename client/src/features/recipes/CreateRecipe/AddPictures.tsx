import { useState } from "react"
import { makeStyles, Button } from "@material-ui/core"
import { AddAPhotoTwoTone, Clear } from "@material-ui/icons"
import React from "react"
import { colors } from "../../../themesAndStyles/colors"

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "10px 0",
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
  },
  thumbnail: {
    margin: 5,
    overflow: "hidden",
    objectFit: "cover",
  },
  imgWrapper: {
    position: "relative",
  },
  deleteImg: {
    cursor: "pointer",
    position: "absolute",
    right: 0,
    height: 15,
    width: 15,
    borderRadius: 15,
    background: colors.error,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: 15,
  },
}))

interface Props {}

const AddPictures: React.FC<Props> = () => {
  const classes = useStyles()
  const [images, setImages] = useState<File[]>([])

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <Button
        endIcon={<AddAPhotoTwoTone />}
        className={classes.btn}
        fullWidth
        color="primary"
        component="label"
      >
        Upload Images
        <input
          onChange={(e) => setImages(Array.from(e.target.files!))}
          accept="image/*"
          type="file"
          multiple
          hidden
        />
      </Button>
      {images && (
        <div className={classes.images}>
          {images.map((file, i) => (
            <div key={i} className={classes.imgWrapper}>
              <div className={classes.deleteImg}>
                <Clear className={classes.icon} />
              </div>
              <img
                className={classes.thumbnail}
                src={URL.createObjectURL(file)}
                alt="foo"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default AddPictures
