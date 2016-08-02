package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class Post extends ProjectObject implements Comparable<Post>
{
	private Date postDate;
	private String title;
	private String text;
	private String author;
	
	public Post(Date postDate, String title, String text, String author)
	{
		this.postDate = postDate;
		this.title = title;
		this.text = text;
		this.author = author;
	}
	
	public Post()
	{
		this.postDate = null;
		this.title = null;
		this.text = null;
		this.author = null;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	/* (non-Javadoc)
	 * @see java.lang.Comparable#compareTo(java.lang.Object)
	 */
	@Override
	public int compareTo(Post o) 
	{
		return o.getPostDate().compareTo(this.getPostDate());
	}
}
