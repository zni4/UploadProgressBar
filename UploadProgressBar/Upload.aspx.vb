Imports System.IO

Public Class Upload
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        CargarFichero()
    End Sub

    Public Function CargarFichero() As Boolean

        Dim rutaFichero As String = ConfigurationManager.AppSettings("RutaCarpetaTemporal")
        Dim strRuta As String = String.Empty
        Dim NombreFichero As String = Request.Files("fileToUpload").FileName
        NombreFichero = NombreFichero.Substring(NombreFichero.LastIndexOf("\") + 1)

        strRuta = rutaFichero + "\" + NombreFichero

        Try

            Directory.CreateDirectory(rutaFichero)

            Dim file As HttpPostedFile = Request.Files("fileToUpload")

            If file IsNot Nothing AndAlso file.ContentLength > 0 Then
                file.SaveAs(strRuta)
            End If

        Catch ex As Exception
            If File.Exists(strRuta) Then
                File.Delete(strRuta)
            End If
        Finally
        End Try

        Return True

    End Function
End Class