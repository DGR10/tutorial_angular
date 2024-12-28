import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private basePath = 'assets/articles/';

  private articles = [
    {
      title: 'Angular',
      slug: 'justificacion-framework',
      summary: 'Justificación del framework Angular',
      file: 'justificacion-framework.html'
    },
    {
      title: 'Instalación',
      slug: 'instalacion',
      summary: 'Instalación del framework Angular',
      file: 'instalacion.html'
    },
    {
      title: 'Hola Mundo',
      slug: 'hola-mundo',
      summary: 'Primer programa con Angular',
      file: 'holamundo.html'
    },
    {
      title: 'Utilizando el framework',
      slug: 'utilizando-framework',
      summary: 'Utilizando el framework',
      file: 'utilizando-framework.html'
    },
    {
      title: 'Explicación sobre el funcionamiento',
      slug: 'explicacion-framework',
      summary: 'Explicación sobre el funcionamiento del framework',
      file: 'explicacion-framework.html'
    },
    {
      title: 'Conclusiones',
      slug: 'conclusiones',
      summary: 'Conclusiones del tutorial',
      file: 'conclusiones.html'
    },
    // Agrega más artículos
  ];

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.articles;
  }

  getArticle(slug: string) {
    return this.articles.find(article => article.slug === slug);
  }

  getArticleContent(slug: string): Observable<string> {
    const article = this.articles.find(article => article.slug === slug);
    if (article) {
      const filePath = `${this.basePath}${article.file}`;
      return this.http.get(filePath, { responseType: 'text' });
    } else {
      throw new Error('Artículo no encontrado');
    }
  }
}
